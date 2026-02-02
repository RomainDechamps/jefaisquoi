// Géolocalisation et reverse geocoding

export interface GeolocationResult {
  lat: number;
  lng: number;
  city: string;
  error?: string;
}

/**
 * Récupère la position actuelle de l'utilisateur
 */
export async function getCurrentPosition(): Promise<GeolocationResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        lat: 48.8566, // Paris par défaut
        lng: 2.3522,
        city: "Paris",
        error: "Géolocalisation non disponible",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const city = await reverseGeocode(latitude, longitude);
        
        resolve({
          lat: latitude,
          lng: longitude,
          city,
        });
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        resolve({
          lat: 48.8566, // Paris par défaut
          lng: 2.3522,
          city: "Paris",
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Reverse geocoding: convertit des coordonnées en nom de ville
 * Utilise l'API Nominatim d'OpenStreetMap (gratuite)
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?` +
        `format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Jefaisquoi-App",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur reverse geocoding");
    }

    const data = await response.json();
    
    // Extraire la ville depuis l'adresse
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      "Localisation inconnue";

    return city;
  } catch (error) {
    console.error("Erreur reverse geocoding:", error);
    return "Localisation inconnue";
  }
}

/**
 * Geocoding: convertit un nom de ville en coordonnées
 */
export async function geocode(
  city: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
        `format=json&q=${encodeURIComponent(city)}&limit=1`,
      {
        headers: {
          "User-Agent": "Jefaisquoi-App",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur geocoding");
    }

    const data = await response.json();
    
    if (data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Erreur geocoding:", error);
    return null;
  }
}
