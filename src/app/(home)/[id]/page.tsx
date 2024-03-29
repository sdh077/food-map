import { Cafe } from "@/interface/cafe";
import List from "./rcc";
import { supabase } from "@/lib/api";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useGetCafeQuery } from "@/redux/services/cafeApi";

const getData = async (localId: string | null, subId: string): Promise<PostgrestSingleResponse<Cafe[]>> => {
    if (subId) return await supabase.from('cafe').select('*').eq('sub_id', subId).returns<Cafe[]>()
    if (localId) return await supabase.from('cafe').select('*').eq('local_id', localId).returns<Cafe[]>()
    return await supabase.from('cafe').select('*').returns<Cafe[]>()

}

export default async function Detail({ searchParams }: { searchParams: { local: string, sub: string } }) {
    // const { data, error } = await getData(searchParams.local ?? null, searchParams.sub ?? null)
    return (
        <>
            <List subId={searchParams.sub} localId={searchParams.local} />
        </>
    )
}