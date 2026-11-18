import {company} from './company';
import {trustMedia} from './trustMedia';

export const aboutStudy = {
  company,
  primaryAction: 'Start a vehicle inquiry',
  primaryHref: '/quote/',
  description: 'Meet the Hangzhou team behind KEEYAK car sourcing. Read the company records and discuss new cars, used cars and export coordination for your market.',
  office: trustMedia('office-original'),
  stories: [
    {date:'May 2026', place:'Vietnam', title:'Starting with the job', body:'Buyers discussed cargo, tanker, sanitation, recovery and aerial work vehicles, along with the requirements for follow up.', href:'/about/news/vietnam-exhibition-2026/', image:trustMedia('vietnam-original')},
    {date:'February 2026', place:'Mexico', title:'Meeting buyers in person', body:'Company photographs from the February 2026 Mexico exhibition.', href:'/about/news/mexico-exhibition-2026/', image:trustMedia('mexico-original')},
    {date:'May 2024', place:'Indonesia', title:'Chassis and body choices', body:'At INAPA, visitors discussed chassis preferences, body functions and equipment requirements.', href:'/about/news/indonesia-exhibition-2024/', image:trustMedia('indonesia-original')}
  ],
  team: trustMedia('team-original'),
  benefits: [
    {number:'01', title:'Find the right version', body:'We compare the model, equipment and quantity you need, then check availability with the supplier.', label:'Explore new cars', href:'/new-cars/'},
    {number:'02', title:'Review the individual car', body:'For used cars, we search to your age, mileage and budget limits and collect available condition records.', label:'Explore used cars', href:'/used-cars/'},
    {number:'03', title:'Know who handles each stage', body:'We coordinate inspection, documents and transport with the providers named for your order.', label:'Read the buying guide', href:'/export-services/buying-guide/'}
  ],
  steps: [
    {number:'01', title:'Tell us what you need', body:'Send the model, quantity, destination and timing. Include the equipment you need or alternatives you would accept.'},
    {number:'02', title:'Review the details together', body:'We check availability and gather the specification, condition records and service requirements for your review.'},
    {number:'03', title:'Compare the written offer', body:'Confirm the vehicle, price basis, included services, timing and responsibilities before placing an order.'}
  ],
  questions: [
    {question:'Which company operates KEEYAK?',answer:`KEEYAK is operated by ${company.legalName} Our office is in Hangzhou, Zhejiang, China.`},
    {question:'Do you work with new and used passenger cars?',answer:'Yes. Our team works with dealers, importers and fleets on new car selection, used car sourcing and export coordination.'},
    {question:'Are the catalog cars available now?',answer:'The catalog is a starting point for a vehicle search. The exact version, quantity, current availability and price need to be confirmed. Used car references do not establish individual stock or condition.'},
    {question:'What does the SGS assessment cover?',answer:'It assesses the supplier, Zhejiang Jingyan Technology Co., Ltd. Manufacturer authorization, vehicle condition and destination registration approval require separate evidence.'},
    {question:'Which business does the country count cover?',answer:'It refers to the wider KEEYAK vehicle business, which also includes special vehicles. It is not a passenger car shipment count.'},
    {question:'Can I visit the Hangzhou office?',answer:`Contact ${company.email} with your preferred date and what you would like to discuss. We can then arrange the meeting.`}
  ]
};
