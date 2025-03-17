import { NextResponse } from 'next/server';
import { connectToDB } from '../../lib/mongodb';

export async function GET() {
  try{
    const db = await connectToDB();
    const customers = await db.collection('Next-customers').find().toArray();
    return NextResponse.json(customers);
  }catch(e){
    console.error('error getting Customers', e);
    return NextResponse.json({e: 'failed to get Customer Details'}, { status: 500 })
  }
}