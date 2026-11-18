export default function FAQ(){
 const questions=[
  {q:'Do the photos show the exact version?',a:<>The photos show the Corolla model family. Confirm the offered version, colour, equipment and steering position against its configuration sheet and vehicle-specific photos.</>},
  {q:'What do you need for a quotation?',a:<>The version, quantity and destination country or port. Ask for itemised costs, currency, offer validity and the agreed handover point. <a href="/export-services/buying-guide/compare-car-export-quotes/">Quotation checklist</a></>},
  {q:'Can this version be imported into my country?',a:<>Destination rules and the offered vehicle’s documents need to be checked together. A China-market emissions label does not establish eligibility elsewhere. <a href="/export-services/buying-guide/#country-guides">Destination checks</a></>},
  {q:'How are inspection and handover agreed?',a:<>Define the inspection provider, scope, acceptance records and release documents in the written offer. Confirm export, transport and support responsibilities before ordering. <a href="/export-services/sourcing-inspection/#scope">Inspection scope</a></>},
  {q:'Are availability and preparation time confirmed?',a:<>Current quantity and preparation time require a dated offer for the selected version. Model-year data is not a production date or a live stock record.</>}
 ];
 return <div className="cs-faq-list">{questions.map((item,i)=><details key={item.q} open={i===0}><summary>{item.q}<span aria-hidden="true">+</span></summary><div><p>{item.a}</p></div></details>)}</div>;
}
