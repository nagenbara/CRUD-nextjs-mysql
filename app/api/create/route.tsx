import { NextRequest, NextResponse } from 'next/server';
import { dbMySQL } from '@/app/database/knex';

export async function POST(req: Request){
  const body = await req.json();
  try {
    const result = await dbMySQL('user').insert(body.data);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}