const headerElement = document.querySelector<HTMLElement>('.ah-header');

if (headerElement) {
  const header = headerElement;
  const desktop = matchMedia('(min-width:900px)');
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
  const row = header.querySelector<HTMLElement>('.ah-header-row')!;
  const nav = header.querySelector<HTMLElement>('.ah-navigation')!;
  const toggle = header.querySelector<HTMLButtonElement>('.ah-menu-toggle')!;
  const surface = header.querySelector<HTMLElement>('.ah-menu-surface')!;
  const indicator = header.querySelector<HTMLElement>('.ah-nav-indicator')!;
  const triggers = Array.from(header.querySelectorAll<HTMLElement>('[data-ah-disclosure]'));
  const panels = triggers.map(button => document.getElementById(button.getAttribute('aria-controls')!)!);
  const plainLinks = Array.from(header.querySelectorAll<HTMLAnchorElement>('.ah-nav-home>a,.ah-nav-contact>a'));
  const topItems: HTMLElement[] = [plainLinks[0], ...triggers, plainLinks[1]];
  const ease = 'cubic-bezier(.23,1,.32,1)';
  let active = -1;
  let hoverTimer = 0;
  let closeTimer = 0;
  let scrollFrame = 0;
  let compact = false;
  let mobileOpen = false;
  let openMode: 'hover' | 'click' | 'keyboard' = 'hover';
  let highlight: HTMLElement | null = null;
  let suppressed: HTMLElement | null = null;
  let indicatorBox = {x: 0, y: 0, width: 0};
  const canAnimate = () => !reducedMotion.matches && header.dataset.input !== 'keyboard';
  const cancelTimers = () => {window.clearTimeout(hoverTimer); window.clearTimeout(closeTimer);};
  const triggerSurface = (item: HTMLElement) => item.closest<HTMLElement>('[data-ah-trigger-group]') || item;

  function setHighlight(item: HTMLElement | null, animate = true) {
    highlight = item;
    topItems.forEach(element => {triggerSurface(element).dataset.highlighted = String(element === item);});
    if (!item || !desktop.matches || !triggerSurface(item).getClientRects().length) {indicator.style.opacity = '0'; return;}
    const bounds = triggerSurface(item).getBoundingClientRect();
    const parent = row.getBoundingClientRect();
    const next = {x: bounds.left - parent.left - row.clientLeft, y: bounds.top - parent.top - row.clientTop, width: bounds.width};
    const liveBounds = indicator.getBoundingClientRect();
    const visible = Number(getComputedStyle(indicator).opacity) > 0 && liveBounds.width > 0;
    const from = {x: liveBounds.left - parent.left - row.clientLeft, y: liveBounds.top - parent.top - row.clientTop, width: liveBounds.width};
    indicator.style.opacity = '1';
    if (Object.keys(next).every(key => next[key as keyof typeof next] === indicatorBox[key as keyof typeof next])) return;
    indicator.getAnimations().forEach(animation => animation.cancel());
    indicator.style.width = `${next.width}px`;
    indicator.style.transform = `translate(${next.x}px,${next.y}px)`;
    if (animate && visible && canAnimate()) {
      indicator.animate([
        {transform: `translate(${from.x}px,${from.y}px) scaleX(${from.width / next.width})`},
        {transform: `translate(${next.x}px,${next.y}px) scaleX(1)`}
      ], {duration: 200, easing: ease});
    }
    indicatorBox = next;
  }
  const defaultHighlight = () => active >= 0 ? triggers[active] : topItems.find(item => item.dataset.current === 'true') || null;

  function updateHeader() {
    if (!mobileOpen) {
      if (scrollY > 96) compact = true;
      else if (scrollY < 40) compact = false;
    }
    header.dataset.compact = String(compact);
    header.dataset.solid = String(header.dataset.alwaysSolid === 'true' || compact || mobileOpen || active >= 0);
    if (highlight) setHighlight(highlight, false);
  }

  function sizeSurface(previousHeight = 0) {
    if (active < 0 || !desktop.matches) return;
    const height = panels[active].getBoundingClientRect().height;
    if (!previousHeight && Math.abs(parseFloat(surface.style.height) - height) < 1) return;
    surface.getAnimations().forEach(animation => animation.cancel());
    surface.style.height = `${height}px`;
    if (previousHeight && height && canAnimate()) {
      surface.animate([{transform: `scaleY(${previousHeight / height})`}, {transform: 'scaleY(1)'}], {duration: 220, easing: ease});
    }
  }

  function hidePanel(index: number, animate: boolean) {
    const panel = panels[index];
    const style = getComputedStyle(panel);
    const from = {opacity: style.opacity, transform: style.transform};
    panel.getAnimations().forEach(animation => animation.cancel());
    panel.inert = true;
    panel.setAttribute('aria-hidden', 'true');
    triggers[index].setAttribute('aria-expanded', 'false');
    if (!animate || !canAnimate()) {panel.hidden = true; return;}
    const animation = panel.animate([
      from,
      {opacity: 0, transform: desktop.matches ? 'translateY(-5px)' : 'translateX(20px)'}
    ], {duration: 150, easing: 'ease-out'});
    animation.finished.then(() => {if (active !== index) panel.hidden = true;}).catch(() => {});
  }

  function closePanels(restoreFocus = false, animate = true) {
    cancelTimers();
    const previous = active;
    active = -1;
    header.dataset.panelOpen = 'false';
    nav.dataset.level = 'main';
    if (previous >= 0) hidePanel(previous, animate);
    updateHeader();
    setHighlight(defaultHighlight());
    if (restoreFocus && previous >= 0) triggers[previous].focus({preventScroll: true});
  }

  function openPanel(index: number, focusContent = false, mode: 'hover' | 'click' | 'keyboard' = 'click') {
    cancelTimers();
    if (mode !== 'hover' || active < 0) openMode = mode;
    if (active === index) return;
    const previous = active;
    const oldHeight = previous >= 0 ? surface.getBoundingClientRect().height : 0;
    const focusedPanel = previous >= 0 && panels[previous].contains(document.activeElement);
    const panel = panels[index];
    const interrupted = !panel.hidden && panel.getAnimations().length > 0;
    const panelStyle = getComputedStyle(panel);
    const liveStart = interrupted ? {opacity: panelStyle.opacity, transform: panelStyle.transform} : null;
    active = index;
    if (previous >= 0) hidePanel(previous, true);
    panel.getAnimations().forEach(animation => animation.cancel());
    panel.hidden = false;
    panel.inert = false;
    panel.removeAttribute('aria-hidden');
    panel.scrollTop = 0;
    triggers[index].setAttribute('aria-expanded', 'true');
    header.dataset.panelOpen = 'true';
    nav.dataset.level = desktop.matches ? 'main' : 'detail';
    updateHeader();
    setHighlight(triggers[index]);
    sizeSurface(oldHeight);
    if (canAnimate()) {
      const movement = desktop.matches ? (previous < 0 ? 'translateY(-6px)' : `translateX(${index > previous ? 8 : -8}px)`) : 'translateX(20px)';
      panel.animate([liveStart || {opacity: 0, transform: movement}, {opacity: 1, transform: 'translate(0,0)'}], {duration: 200, easing: ease});
      if (previous < 0 && desktop.matches) surface.animate([{opacity: 0, transform: 'translateY(-8px) scaleY(.97)'}, {opacity: 1, transform: 'translateY(0) scaleY(1)'}], {duration: 220, easing: ease});
    }
    if (!desktop.matches) panel.querySelector<HTMLButtonElement>('.ah-panel-back')?.focus({preventScroll: true});
    else if (focusContent) panel.querySelector<HTMLAnchorElement>('a')?.focus({preventScroll: true});
    else if (focusedPanel) triggers[index].focus({preventScroll: true});
  }

  function setMobile(open: boolean, restoreFocus = false) {
    closePanels(false, false);
    mobileOpen = open;
    header.classList.toggle('ah-menu-is-open', open);
    document.documentElement.classList.toggle('ah-nav-lock', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.inert = !desktop.matches && !open;
    if (open) {
      header.setAttribute('role', 'dialog');
      header.setAttribute('aria-modal', 'true');
      header.setAttribute('aria-label', 'Main navigation');
    } else {
      header.removeAttribute('role');
      header.removeAttribute('aria-modal');
      header.removeAttribute('aria-label');
    }
    document.querySelectorAll<HTMLElement>('main,footer').forEach(element => {element.inert = open;});
    updateHeader();
    if (restoreFocus) toggle.focus({preventScroll: true});
  }

  triggers.forEach((button, index) => {
    const trigger = triggerSurface(button);
    trigger.addEventListener('pointerenter', event => {
      if (!desktop.matches || !finePointer.matches || event.pointerType === 'touch') return;
      header.dataset.input = 'pointer';
      cancelTimers();
      setHighlight(button);
      if (suppressed !== button) hoverTimer = window.setTimeout(() => openPanel(index, false, 'hover'), active >= 0 ? 60 : 130);
    });
    trigger.addEventListener('pointerleave', () => {window.clearTimeout(hoverTimer); suppressed = null;});
    button.addEventListener('click', () => {
      if (button instanceof HTMLAnchorElement) {cancelTimers(); return;}
      if (active === index && openMode === 'hover') openMode = 'click';
      else if (active === index) {suppressed = button; closePanels(true);}
      else openPanel(index);
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {event.preventDefault(); if (active !== index) openPanel(index, true, 'keyboard'); else panels[index].querySelector<HTMLAnchorElement>('a')?.focus();}
    });
    panels[index].addEventListener('pointerenter', () => {cancelTimers(); setHighlight(button);});
    panels[index].querySelector('.ah-panel-back')?.addEventListener('click', () => closePanels(true));
    panels[index].querySelector('.ah-panel-dismiss')?.addEventListener('click', () => closePanels(true));
  });

  plainLinks.forEach(link => link.addEventListener('pointerenter', () => {if (desktop.matches && finePointer.matches) {cancelTimers(); closePanels(); setHighlight(link);}}));
  row.addEventListener('pointerenter', () => {window.clearTimeout(closeTimer);});
  row.addEventListener('pointerleave', () => {
    window.clearTimeout(hoverTimer);
    if (desktop.matches && finePointer.matches) closeTimer = window.setTimeout(() => {
      if (active >= 0 && openMode !== 'hover') {setHighlight(defaultHighlight()); return;}
      if (active >= 0 && panels[active].contains(document.activeElement)) return;
      closePanels();
    }, 240);
  });
  topItems.forEach(item => {
    const group = triggerSurface(item);
    group.addEventListener('focusin', () => {if (desktop.matches) setHighlight(item);});
    group.addEventListener('keydown', event => {
      if (!desktop.matches || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
      event.preventDefault();
      const visibleItems = topItems.filter(element => element.getClientRects().length);
      const next = (visibleItems.indexOf(item) + (event.key === 'ArrowRight' ? 1 : -1) + visibleItems.length) % visibleItems.length;
      const nextItem = visibleItems[next];
      (triggerSurface(nextItem).querySelector<HTMLElement>('.ah-nav-direct') || nextItem).focus();
      if (active >= 0) {
        const panelIndex = triggers.indexOf(nextItem);
        if (panelIndex >= 0) openPanel(panelIndex, false, 'keyboard');
        else {closePanels(false, false); setHighlight(nextItem, false);}
      }
    });
  });
  nav.addEventListener('focusout', event => {
    const next = event.relatedTarget as Node | null;
    if (desktop.matches && next && !nav.contains(next)) closePanels();
  });
  header.addEventListener('pointerdown', () => {header.dataset.input = 'pointer';}, true);
  header.addEventListener('keydown', () => {header.dataset.input = 'keyboard';}, true);
  toggle.addEventListener('click', () => setMobile(!mobileOpen));
  header.querySelector('.ah-nav-backdrop')?.addEventListener('click', () => mobileOpen ? setMobile(false, true) : closePanels(true));
  header.querySelector('.car-search-trigger')?.addEventListener('click', () => {closePanels(); if (mobileOpen) setMobile(false);});
  document.addEventListener('click', event => {if (!header.contains(event.target as Node)) closePanels();});
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (mobileOpen || active >= 0)) {
      event.preventDefault();
      if (active >= 0) closePanels(true);
      else setMobile(false, true);
    }
    if (event.key === 'Tab' && mobileOpen) {
      const items = Array.from(header.querySelectorAll<HTMLElement>('a,button,input')).filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden' && !element.closest('[hidden],[inert],dialog:not([open])'));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last?.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first?.focus();}
    }
  });
  const resizeObserver = new ResizeObserver(() => {sizeSurface(); if (highlight) setHighlight(highlight, false);});
  resizeObserver.observe(row);
  panels.forEach(panel => resizeObserver.observe(panel));
  desktop.addEventListener('change', () => {setMobile(false); setHighlight(defaultHighlight(), false);});
  addEventListener('scroll', () => {if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {scrollFrame = 0; updateHeader();});}, {passive: true});
  nav.inert = !desktop.matches;
  updateHeader();
  setHighlight(defaultHighlight(), false);
}

export {};
