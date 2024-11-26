import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
    const [name, setName] = useState("");
    const [categories,setCategories] = useState([]);

    useEffect( () => {
        axios.get("/api/categories").then( result => {
            setCategories(result.data);
        }), [];
    })
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
          setCategories(result.data);
        });
      }
    return (
        <Layout>
            <h1 className="font-bold text-xl py-2">Categories</h1>
            
            <form onSubmit={saveCategory} className="flex gap-1">
                <input className="px-1 border rounded-lg " type="text" placeholder="Category name"
                    onChange= {ev => setName(ev.target.value)} value={name} 
                />
                <button type="submit" className="btn-primary">Save</button>

            </form>

            <table className="basic mt-4">
          <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td>
                <button
                  onClick={() => editCategory(category)}
                  className="btn-default mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category)}
                  className="btn-red">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        </Layout>
    );
}