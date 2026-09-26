import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/admin.api";
import { getErrorMessage } from "@joe-wilson/shared/lib/errors";

export default function AccountPage() {
  const qc=useQueryClient(); const me=useQuery({queryKey:["admin","me"],queryFn:adminApi.me});
  const [form,setForm]=useState({firstName:"",lastName:"",avatarUrl:""});
  useEffect(()=>{if(me.data)setForm({firstName:me.data.firstName,lastName:me.data.lastName,avatarUrl:me.data.avatarUrl??""});},[me.data]);
  const save=useMutation({mutationFn:adminApi.updateMe,onSuccess:()=>qc.invalidateQueries({queryKey:["admin","me"]})});
  return <div className="p-5 lg:p-7 max-w-2xl mx-auto space-y-6"><div><p className="text-[11px] font-bold text-brand uppercase">Account</p><h1 className="text-3xl font-bold">Your profile</h1><p className="text-sm text-gray-500">This page uses your actual administrator account. Team invitations, password changes and session management need backend endpoints before they can be offered here.</p></div>{me.isPending?<p>Loading account…</p>:<form onSubmit={e=>{e.preventDefault();save.mutate(form);}} className="bg-white border p-6 space-y-5"><p className="text-sm"><strong>Email:</strong> {me.data?.email}</p><p className="text-sm"><strong>Role:</strong> {me.data?.role}</p><div className="grid sm:grid-cols-2 gap-4"><label className="text-sm">First name<input required value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} className="mt-2 w-full border p-3"/></label><label className="text-sm">Last name<input required value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} className="mt-2 w-full border p-3"/></label></div><label className="block text-sm">Avatar URL<input type="url" value={form.avatarUrl} onChange={e=>setForm({...form,avatarUrl:e.target.value})} className="mt-2 w-full border p-3" placeholder="https://…"/></label>{save.error&&<p className="text-sm text-red-700">{getErrorMessage(save.error)}</p>}{save.isSuccess&&<p className="text-sm text-green-700">Profile saved.</p>}<button disabled={save.isPending} className="bg-brand text-white px-5 py-3">{save.isPending?"Saving…":"Save profile"}</button></form>}</div>;
}
