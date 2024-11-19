import Layout from "@/components/Layout";

export default function NewItem(){
    return (
        <Layout>
            <h1>Add New Item</h1>
            <label>Product Name</label>
            <input type="text" placeholder="Item Name"/>
            <label>Product Description</label>
            <textarea placeholder="Item Description"></textarea>
            <label>Product Price (USD)</label>
            <input type="number" placeholder="Item Price"/>
            <button className="btn-new-product">Save</button>
        </Layout>
    )
}