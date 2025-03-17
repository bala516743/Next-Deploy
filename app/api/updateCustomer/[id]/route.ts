import { connectToDB } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {

    // Extract the ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Get the ID from the URL path
    
    const db = await connectToDB();
    const user = await db.collection('Next-customers').findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json({ error: 'customers not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Get the ID from the URL path
    const db = await connectToDB();
    const { name, age, gender, mobile, gmail } = await request.json();

    const updateCustomer = { name, age, gender, mobile, gmail };

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    if (!name || !age || !gender || !mobile || !gmail ) {
      return NextResponse.json({ error: 'All fields (name, age, gender, mobile) are required' }, { status: 400 });
    }

    // Find and update the customer by ID
    const result = await db.collection('Next-customers').updateOne({ _id: new ObjectId(id) }, { $set: updateCustomer });
  
    if (!updateCustomer) {
      return NextResponse.json({ error: 'Customer not found or update failed' } , { status: 404 } );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ _id: id, ...updateCustomer });
  } catch (error) {
    console.error('Error updating Customer:', error);
    return NextResponse.json({ error: 'Failed to update Customer' }, { status: 500 });  
  }
}