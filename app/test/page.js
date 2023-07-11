import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: avaliacao } = await supabase.from("avaliacao").select().limit(1);

  return (
    <ul>
      {avaliacao[0].texto}
    </ul>
  );
}