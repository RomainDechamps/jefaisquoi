import { NextRequest, NextResponse } from "next/server";
import { SearchParams } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const params: SearchParams = await request.json();

    // Valider les paramètres
    if (!params.location || !params.activityTypes || params.activityTypes.length === 0) {
      return NextResponse.json(
        { error: "Paramètres invalides" },
        { status: 400 }
      );
    }

    // Appeler le webhook n8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL non défini");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Erreur webhook n8n: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur API search:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
