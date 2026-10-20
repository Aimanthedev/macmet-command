import { test, expect } from "bun:test";
import { boqTotals, applicationTotals, createWorkspace, workspaceFinancials } from "../project-workspace";
import { projects } from "../../data/mock";
test("BOQ quantity multiplied by rate recalculates contract and executed totals", () => {
 const p=projects[0]; const w=createWorkspace(p); w.boq=[{id:"b",section:"Civil",code:"BQ-1",description:"Concrete",unit:"m³",quantity:100,rate:250,executed:40,certified:30,actualCost:8000,forecastCost:21000}];
 expect(boqTotals(w.boq)).toEqual({contract:25000,executed:10000,certified:7500,actual:8000,forecast:21000});
 w.boq[0].quantity=200;expect(boqTotals(w.boq).contract).toBe(50000);
});
test("payment application is distinct from certificate, invoice and receipts",()=>{
 expect(applicationTotals({id:"ipa",work:100000,materials:20000,previous:20000,retentionPercent:5,recoveryPercent:10,invoice:60000,received:25000})).toEqual({gross:120000,retention:6000,recovery:12000,claim:82000,outstanding:35000});
});
test("only approved variations enter revised contract and forecast profit",()=>{
 const p=projects[0],w=createWorkspace(p);w.registers.variations=[{id:"v1",status:"Approved",approved:100000},{id:"v2",status:"Submitted",approved:500000}];const f=workspaceFinancials(p,w);
 expect(f.approved).toBe(100000);expect(f.revised).toBeCloseTo(p.contractValue+100000,2);expect(f.profit).toBeCloseTo(f.revised-f.forecast,2);
});
test("fictional project BOQ baselines reconcile to their contract and actual cost",()=>{
 for(const p of projects){const f=workspaceFinancials(p,createWorkspace(p));expect(f.contract).toBeCloseTo(p.contractValue,2);expect(f.actual).toBeCloseTo(p.costToDate,2);}
});
