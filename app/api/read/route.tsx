import { NextRequest, NextResponse } from 'next/server';
import { dbMySQL } from '@/app/database/knex';

export async function POST(req: Request){
  // const body = await req.json();
  try {
    const result = await dbMySQL.select('*').from('user')
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
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