import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

interface ReservacionBody {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: number;
  notas?: string;
}

export async function POST(req: NextRequest) {
  const body: ReservacionBody = await req.json().catch(() => null);

  if (!body || !body.nombre || !body.telefono || !body.fecha || !body.hora || !body.personas) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  if (body.personas < 1 || body.personas > 20) {
    return NextResponse.json({ error: "Número de personas inválido" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    // Supabase aún no configurado — modo sin BD
    console.warn("[reservaciones] Supabase no configurado. Reservación no guardada:", body);
    return NextResponse.json({ ok: true, id: "sin-db" });
  }

  const { data, error } = await supabase
    .from("reservaciones")
    .insert({
      nombre: body.nombre,
      telefono: body.telefono,
      fecha: body.fecha,
      hora: body.hora,
      personas: body.personas,
      notas: body.notas ?? null,
      estado: "pendiente",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[reservaciones] Error al guardar:", error);
    return NextResponse.json({ error: "No se pudo guardar la reservación" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
