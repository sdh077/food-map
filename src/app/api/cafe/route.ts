import { Cafe } from "@/interface/cafe";
import { supabase } from "@/lib/api";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const subId = searchParams.get('sub')
    const localId = searchParams.get('local')
    let res;
    if (subId) res = await supabase.from('cafe').select('*').eq('sub_id', subId).returns<Cafe[]>()
    if (localId) res = await supabase.from('cafe').select('*').eq('local_id', localId).returns<Cafe[]>()
    res = await supabase.from('cafe').select('*').returns<Cafe[]>()
    return Response.json({ data: res.data })
}