import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Image as ImageIcon, Music, Search, Trash2, Upload, Video } from "lucide-react";
import { adminApi } from "@/api/admin.api";
import { getErrorMessage } from "@joe-wilson/shared/lib/errors";

const iconFor = (type:string) => type==="image"?<ImageIcon/>:type==="audio"?<Music/>:type==="video"?<Video/>:<FileText/>;
const sizeFor = (bytes:number) => bytes>=1048576?`${(bytes/1048576).toFixed(1)} MB`:`${Math.ceil(bytes/1024)} KB`;

export default function MediaLibraryPage(){
  const [search,setSearch]=useState(""); const input=useRef<HTMLInputElement>(null); const qc=useQueryClient();
  const query=useQuery({queryKey:["admin","media"],queryFn:adminApi.media});
  const upload=useMutation({mutationFn:adminApi.uploadMedia,onSuccess:()=>qc.invalidateQueries({queryKey:["admin","media"]})});
  const remove=useMutation({mutationFn:adminApi.deleteMedia,onSuccess:()=>qc.invalidateQueries({queryKey:["admin","media"]})});
  const files=useMemo(()=>(query.data??[]).filter(item=>item.filename.toLowerCase().includes(search.toLowerCase())),[query.data,search]);
  const error=query.error||upload.error||remove.error;
  async function choose(event:React.ChangeEvent<HTMLInputElement>){for(const file of Array.from(event.target.files??[])) await upload.mutateAsync(file);event.target.value="";}
  return <div className="p-5 lg:p-7 max-w-[1280px] mx-auto space-y-6"><div className="flex justify-between gap-4"><div><p className="text-[11px] font-bold text-brand uppercase tracking-widest">Library</p><h1 className="text-3xl font-bold">Media</h1><p className="text-sm text-gray-500">Upload files for masterclasses and site content.</p></div><button onClick={()=>input.current?.click()} disabled={upload.isPending} className="self-start bg-brand text-white px-5 py-3 flex gap-2"><Upload size={16}/>{upload.isPending?"Uploading…":"Upload files"}</button><input ref={input} hidden multiple type="file" onChange={choose}/></div>{error&&<p role="alert" className="bg-red-50 text-red-700 p-3">{getErrorMessage(error)}</p>}<label className="relative block max-w-sm"><Search size={15} className="absolute left-3 top-3.5 text-gray-400"/><input value={search} onChange={e=>setSearch(e.target.value)} className="w-full border pl-9 p-3" placeholder="Search files"/></label>{query.isPending?<p>Loading media…</p>:files.length===0?<div className="border border-dashed p-16 text-center text-gray-500">No uploaded files found.</div>:<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{files.map(item=><article key={item.id} className="bg-white border overflow-hidden"><div className="h-40 bg-gray-100 grid place-items-center text-gray-400">{item.fileType==="image"?<img src={item.url} alt={item.filename} className="w-full h-full object-cover"/>:iconFor(item.fileType)}</div><div className="p-4"><a href={item.url} target="_blank" rel="noreferrer" className="font-semibold text-sm break-all hover:text-brand">{item.filename}</a><p className="text-xs text-gray-400 mt-1">{item.fileType} · {sizeFor(item.sizeBytes)}</p><button onClick={()=>confirm(`Delete ${item.filename}?`)&&remove.mutate(item.id)} disabled={remove.isPending} className="mt-4 text-red-600 text-xs flex gap-2"><Trash2 size={14}/>Delete</button></div></article>)}</div>}</div>;
}
