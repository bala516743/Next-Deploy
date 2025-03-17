import { NextResponse } from 'next/server';
import { connectToDB } from '../../lib/mongodb';

export async function POST(request: Request) {
  try{
    const db = await connectToDB();
    
    //Sending Payload
    const { name, age, gender, mobile, gmail } = await request.json();

    const newCustomer = { name, age, gender, mobile, gmail }

    // //create customer in DB
    const result = await db.collection('Next-customers').insertOne(newCustomer);

    const response = { id: result.insertedId.toString(),  name, age, gender, mobile, gmail, };

    return NextResponse.json( response , { status: 200 });
  }catch(e){
    console.error('error creating Customers', e);
    return NextResponse.json({ error: 'Failed to create Customer' }, { status: 500 });
  }
}