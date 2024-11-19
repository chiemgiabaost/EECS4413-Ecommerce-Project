import Layout from "@/components/Layout";
import Link from "next/link";

export default function Items(){
    return (
        <Layout>
            <Link className="bg-gradient-to-r from-black to-blue-900 rounded-lg px-4 py-2 text-white" href={'/items/new'}>Add new product</Link>
        <table>  {/*should complete...*/}
            <thread>
                <td></td>
            </thread>
        </table>
        
        </Layout>
    )
}