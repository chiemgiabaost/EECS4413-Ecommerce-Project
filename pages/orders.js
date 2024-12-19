import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Layout from "@/components/Layout";
import React from "react";

// Styled components
const OrdersWrapper = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const OrderRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Header = styled.h1`
  text-align: center;
`;

const SortButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LineItemRow = styled.tr`
  background-color: #fafafa;
`;

const LineItemDetails = styled.td`
  padding-left: 20px;
  font-size: 0.9rem;
  color: #333;
`;

// Orders Page Component
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true); // State to track sorting order

  // Fetch orders from the API
  useEffect(() => {
    axios
      .get("/api/order")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // formats the date and time based on the locale
  };

  // Function to handle sorting by createdAt date
  const sortOrdersByDate = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortAscending ? dateA - dateB : dateB - dateA;
    });

    setOrders(sortedOrders);
    setSortAscending(!sortAscending); // Toggle sorting order
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <Layout>
      <OrdersWrapper>
        <Header>All Orders</Header>
        {/* Sorting Button */}
        <SortButton onClick={sortOrdersByDate}>
          Sort by Time ({sortAscending ? "Ascending" : "Descending"})
        </SortButton>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Country</th>
                <th>Paid</th>
                <th>Created At</th> {/* Added Created At */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <OrderRow>
                    <td>{order._id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.city}</td>
                    <td>{order.postalCode}</td>
                    <td>{order.country}</td>
                    <td>{order.paid ? "Yes" : "No"}</td>
                    <td>{formatDate(order.createdAt)}</td> {/* Display Created At */}
                  </OrderRow>

                  {/* Render line items for the current order */}
                  {order.line_items &&
                    order.line_items.length > 0 &&
                    order.line_items.map((lineItem, index) => (
                      <LineItemRow key={`line-item-${index}`}>
                        <LineItemDetails colSpan={9}>
                          <strong>Product Name:</strong> {lineItem.price_data.product_data.name} <br />
                          <strong>Quantity:</strong> {lineItem.quantity} <br />
                          <strong>Price:</strong> ${(lineItem.price_data.unit_amount / 100).toFixed(2)} <br />
                        </LineItemDetails>
                      </LineItemRow>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        )}
      </OrdersWrapper>
    </Layout>
  );
}
