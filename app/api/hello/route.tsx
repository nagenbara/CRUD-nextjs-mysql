import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export async function POST(req: Request){
  const body = await req.json();
  try {
    return NextResponse.json({ message: body })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}

export async function GET(req: NextRequest){
  const search = req.nextUrl.searchParams.get('tes')
  try {
    return NextResponse.json({ message: search })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}