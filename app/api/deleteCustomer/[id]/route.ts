import { connectToDB } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    
    // Extract the ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Get the ID from the URL path
    console.log('id', id);
    

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const db = await connectToDB();
    const deleteCustomer = await db.collection("Next-customers").deleteOne({ _id: new ObjectId(id) });

    if (deleteCustomer.deletedCount === 0) {
      return NextResponse.json({ error: "Customer Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Customer Deleted Successfully" });
  } catch (e) {
    console.error("Error Deleting Customer", e);
    return NextResponse.json({ error: "Failed to delete Customer" }, { status: 500 });
  }
}