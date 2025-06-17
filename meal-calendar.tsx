"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Utensils, X, ChevronLeft, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const mealData = {
  Lunes: {
    desayuno: {
      nombre: "Pancake de avena y banana",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        { item: "Banana", cantidad: "100 g", calorias: 89, proteinas: 1.1, carbohidratos: 22.8, grasas: 0.3 },
        { item: "Esencia de vainilla", cantidad: "1 cdita", calorias: 12, proteinas: 0, carbohidratos: 0.5, grasas: 0 },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    almuerzo: {
      nombre: "Wok de pollo, vegetales y arroz integral",
      ingredientes: [
        {
          item: "Arroz integral seco",
          cantidad: "40 g",
          calorias: 143,
          proteinas: 2.9,
          carbohidratos: 29.2,
          grasas: 1.1,
        },
        {
          item: "Pechuga de pollo cocida",
          cantidad: "200 g",
          calorias: 330,
          proteinas: 62,
          carbohidratos: 0,
          grasas: 7.4,
        },
        { item: "Brócoli", cantidad: "50 g", calorias: 17, proteinas: 1.4, carbohidratos: 3.3, grasas: 0.2 },
        { item: "Zanahoria", cantidad: "50 g", calorias: 20, proteinas: 0.5, carbohidratos: 4.6, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "10 g", calorias: 88, proteinas: 0, carbohidratos: 0, grasas: 10 },
        {
          item: "Condimentos (ajo, orégano, pimienta)",
          cantidad: "al gusto",
          calorias: 5,
          proteinas: 0.2,
          carbohidratos: 1,
          grasas: 0.1,
        },
      ],
    },
    merienda: {
      nombre: "Tostada integral y huevos duros",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Huevos duros",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
      ],
    },
    cena: {
      nombre: "Milanesa de pollo con avena y ensalada",
      ingredientes: [
        {
          item: "Pechuga de pollo cruda",
          cantidad: "150 g",
          calorias: 248,
          proteinas: 46.5,
          carbohidratos: 0,
          grasas: 5.6,
        },
        {
          item: "Avena en hojuelas",
          cantidad: "30 g",
          calorias: 114,
          proteinas: 4.1,
          carbohidratos: 20.7,
          grasas: 2.1,
        },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        { item: "Lechuga", cantidad: "50 g", calorias: 8, proteinas: 0.7, carbohidratos: 1.5, grasas: 0.1 },
        { item: "Tomate", cantidad: "50 g", calorias: 9, proteinas: 0.4, carbohidratos: 1.9, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "5 g", calorias: 44, proteinas: 0, carbohidratos: 0, grasas: 5 },
      ],
    },
  },
  Martes: {
    desayuno: {
      nombre: "Tostada integral con revuelto de huevos y espinacas",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Huevos revueltos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        {
          item: "Espinacas salteadas",
          cantidad: "50 g",
          calorias: 12,
          proteinas: 1.5,
          carbohidratos: 1.8,
          grasas: 0.2,
        },
      ],
    },
    almuerzo: {
      nombre: "Tacos de pollo, queso y verduras salteadas",
      ingredientes: [
        {
          item: "Tortillas integrales",
          cantidad: "2 unidades (≈50 g)",
          calorias: 120,
          proteinas: 4,
          carbohidratos: 21,
          grasas: 2.5,
        },
        { item: "Pollo cocido", cantidad: "200 g", calorias: 330, proteinas: 62, carbohidratos: 0, grasas: 7.4 },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        {
          item: "Pimiento rojo salteado",
          cantidad: "80 g",
          calorias: 26,
          proteinas: 0.8,
          carbohidratos: 6,
          grasas: 0.2,
        },
        { item: "Cebolla salteada", cantidad: "50 g", calorias: 20, proteinas: 0.6, carbohidratos: 4.7, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "10 g", calorias: 88, proteinas: 0, carbohidratos: 0, grasas: 10 },
      ],
    },
    merienda: {
      nombre: "Pancake de avena con frutillas",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        { item: "Frutillas", cantidad: "100 g", calorias: 32, proteinas: 0.7, carbohidratos: 7.7, grasas: 0.3 },
        { item: "Esencia de vainilla", cantidad: "1 cdita", calorias: 12, proteinas: 0, carbohidratos: 0.5, grasas: 0 },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    cena: {
      nombre: "Pastel de carne picada con papa y zapallo",
      ingredientes: [
        {
          item: "Carne vacuna magra picada",
          cantidad: "150 g",
          calorias: 300,
          proteinas: 39,
          carbohidratos: 0,
          grasas: 15,
        },
        { item: "Papa en cubos", cantidad: "100 g", calorias: 77, proteinas: 2, carbohidratos: 17, grasas: 0.1 },
        { item: "Zapallo en cubos", cantidad: "100 g", calorias: 26, proteinas: 1, carbohidratos: 6.5, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "10 g", calorias: 88, proteinas: 0, carbohidratos: 0, grasas: 10 },
        { item: "Cebolla", cantidad: "50 g", calorias: 20, proteinas: 0.6, carbohidratos: 4.7, grasas: 0.1 },
        {
          item: "Condimentos (pimentón, orégano)",
          cantidad: "al gusto",
          calorias: 5,
          proteinas: 0.2,
          carbohidratos: 1,
          grasas: 0.1,
        },
      ],
    },
  },
  Miércoles: {
    desayuno: {
      nombre: "Pancake de avena con manzana y canela",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        {
          item: "Manzana salteada con canela",
          cantidad: "150 g",
          calorias: 78,
          proteinas: 0.4,
          carbohidratos: 20.6,
          grasas: 0.3,
        },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    almuerzo: {
      nombre: "Tarta de pollo",
      ingredientes: [
        {
          item: "Masa de tarta (1 tapa)",
          cantidad: "60 g",
          calorias: 180,
          proteinas: 4.2,
          carbohidratos: 24,
          grasas: 7.8,
        },
        {
          item: "Pollo cocido desmenuzado",
          cantidad: "200 g",
          calorias: 330,
          proteinas: 62,
          carbohidratos: 0,
          grasas: 7.4,
        },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        { item: "Mix de semillas", cantidad: "10 g", calorias: 55, proteinas: 2.5, carbohidratos: 2, grasas: 4.5 },
        { item: "Espinaca", cantidad: "50 g", calorias: 12, proteinas: 1.5, carbohidratos: 1.8, grasas: 0.2 },
      ],
    },
    merienda: {
      nombre: "Tostada integral y huevos duros",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Huevos duros",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
      ],
    },
    cena: {
      nombre: "Tacos rellenos de vegetales y queso",
      ingredientes: [
        {
          item: "Tortillas integrales",
          cantidad: "2 unidades (≈50 g)",
          calorias: 120,
          proteinas: 4,
          carbohidratos: 21,
          grasas: 2.5,
        },
        {
          item: "Zapallitos y zanahorias salteados",
          cantidad: "150 g",
          calorias: 30,
          proteinas: 1.5,
          carbohidratos: 6.9,
          grasas: 0.3,
        },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        { item: "Aceite de oliva", cantidad: "10 g", calorias: 88, proteinas: 0, carbohidratos: 0, grasas: 10 },
      ],
    },
  },
  Jueves: {
    desayuno: {
      nombre: "Tostada integral con omelette de huevos y rúcula",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Omelette de huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Rúcula", cantidad: "30 g", calorias: 8, proteinas: 0.8, carbohidratos: 1.2, grasas: 0.2 },
      ],
    },
    almuerzo: {
      nombre: "Milanesa de berenjena con avena y ensalada",
      ingredientes: [
        { item: "Berenjena en rodajas", cantidad: "200 g", calorias: 50, proteinas: 2, carbohidratos: 12, grasas: 0.4 },
        {
          item: "Avena para empanar",
          cantidad: "30 g",
          calorias: 114,
          proteinas: 4.1,
          carbohidratos: 20.7,
          grasas: 2.1,
        },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        { item: "Lechuga", cantidad: "50 g", calorias: 8, proteinas: 0.7, carbohidratos: 1.5, grasas: 0.1 },
        { item: "Tomate", cantidad: "50 g", calorias: 9, proteinas: 0.4, carbohidratos: 1.9, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "5 g", calorias: 44, proteinas: 0, carbohidratos: 0, grasas: 5 },
      ],
    },
    merienda: {
      nombre: "Pancake de avena con pera",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        { item: "Pera", cantidad: "150 g", calorias: 87, proteinas: 0.5, carbohidratos: 23.1, grasas: 0.2 },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    cena: {
      nombre: "Pastel de carne con puré de calabaza y brócoli",
      ingredientes: [
        {
          item: "Carne vacuna magra picada",
          cantidad: "150 g",
          calorias: 300,
          proteinas: 39,
          carbohidratos: 0,
          grasas: 15,
        },
        { item: "Puré de calabaza", cantidad: "150 g", calorias: 39, proteinas: 1.5, carbohidratos: 9.8, grasas: 0.2 },
        { item: "Brócoli al vapor", cantidad: "50 g", calorias: 17, proteinas: 1.4, carbohidratos: 3.3, grasas: 0.2 },
        { item: "Aceite de oliva", cantidad: "5 g", calorias: 44, proteinas: 0, carbohidratos: 0, grasas: 5 },
      ],
    },
  },
  Viernes: {
    desayuno: {
      nombre: "Pancake de avena con durazno",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        { item: "Durazno", cantidad: "150 g", calorias: 58, proteinas: 1.4, carbohidratos: 14.3, grasas: 0.4 },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    almuerzo: {
      nombre: "Tarta de verduras",
      ingredientes: [
        {
          item: "Masa de tarta (1 tapa)",
          cantidad: "60 g",
          calorias: 180,
          proteinas: 4.2,
          carbohidratos: 24,
          grasas: 7.8,
        },
        { item: "Zapallo", cantidad: "100 g", calorias: 26, proteinas: 1, carbohidratos: 6.5, grasas: 0.1 },
        { item: "Choclo", cantidad: "50 g", calorias: 43, proteinas: 1.6, carbohidratos: 9.4, grasas: 0.6 },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        {
          item: "Ensalada cruda (lechuga, tomate)",
          cantidad: "100 g",
          calorias: 17,
          proteinas: 1.1,
          carbohidratos: 3.4,
          grasas: 0.2,
        },
      ],
    },
    merienda: {
      nombre: "Tostada integral y huevos revueltos",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Huevos revueltos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
      ],
    },
    cena: {
      nombre: "Sándwich de atún",
      ingredientes: [
        { item: "Pan integral", cantidad: "60 g", calorias: 144, proteinas: 5.4, carbohidratos: 25.8, grasas: 2.4 },
        { item: "Atún en agua", cantidad: "120 g", calorias: 132, proteinas: 30, carbohidratos: 0, grasas: 1.2 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        { item: "Zanahoria rallada", cantidad: "50 g", calorias: 20, proteinas: 0.5, carbohidratos: 4.6, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "5 g", calorias: 44, proteinas: 0, carbohidratos: 0, grasas: 5 },
      ],
    },
  },
  Sábado: {
    desayuno: {
      nombre: "Tostada integral con huevos y tomate",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Tomate", cantidad: "50 g", calorias: 9, proteinas: 0.4, carbohidratos: 1.9, grasas: 0.1 },
      ],
    },
    almuerzo: {
      nombre: "Hamburguesa vegetal con ensalada",
      ingredientes: [
        { item: "Lentejas cocidas", cantidad: "100 g", calorias: 116, proteinas: 9, carbohidratos: 20, grasas: 0.4 },
        { item: "Quinoa cocida", cantidad: "50 g", calorias: 60, proteinas: 2.2, carbohidratos: 10.9, grasas: 0.9 },
        { item: "Queso Port Salut", cantidad: "60 g", calorias: 210, proteinas: 15, carbohidratos: 1.2, grasas: 16.2 },
        { item: "Lechuga", cantidad: "50 g", calorias: 8, proteinas: 0.7, carbohidratos: 1.5, grasas: 0.1 },
        { item: "Tomate", cantidad: "50 g", calorias: 9, proteinas: 0.4, carbohidratos: 1.9, grasas: 0.1 },
        { item: "Aceite de oliva", cantidad: "5 g", calorias: 44, proteinas: 0, carbohidratos: 0, grasas: 5 },
      ],
    },
    merienda: {
      nombre: "Pancake de avena con frambuesas",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        { item: "Frambuesas", cantidad: "100 g", calorias: 52, proteinas: 1.2, carbohidratos: 11.9, grasas: 0.7 },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    cena: {
      nombre: "Wrap de zapallo, pimiento y pollo",
      ingredientes: [
        { item: "Tortilla integral", cantidad: "30 g", calorias: 72, proteinas: 2.4, carbohidratos: 12.6, grasas: 1.5 },
        { item: "Zapallo asado", cantidad: "100 g", calorias: 26, proteinas: 1, carbohidratos: 6.5, grasas: 0.1 },
        { item: "Morrón asado", cantidad: "50 g", calorias: 16, proteinas: 0.4, carbohidratos: 3.8, grasas: 0.1 },
        { item: "Rúcula", cantidad: "20 g", calorias: 5, proteinas: 0.5, carbohidratos: 0.8, grasas: 0.1 },
        { item: "Pollo cocido", cantidad: "150 g", calorias: 248, proteinas: 46.5, carbohidratos: 0, grasas: 5.6 },
        { item: "Aceite de oliva", cantidad: "5 g", calorias: 44, proteinas: 0, carbohidratos: 0, grasas: 5 },
      ],
    },
  },
  Domingo: {
    desayuno: {
      nombre: "Pancake de avena con mango",
      ingredientes: [
        {
          item: "Huevos",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
        { item: "Avena", cantidad: "40 g", calorias: 152, proteinas: 5.4, carbohidratos: 27.6, grasas: 2.8 },
        { item: "Mango", cantidad: "100 g", calorias: 60, proteinas: 0.8, carbohidratos: 15, grasas: 0.4 },
        { item: "Edulcorante", cantidad: "al gusto", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      ],
    },
    almuerzo: {
      nombre: "Sushi (10 piezas)",
      ingredientes: [
        {
          item: "Arroz para sushi seco",
          cantidad: "80 g",
          calorias: 286,
          proteinas: 5.8,
          carbohidratos: 58.4,
          grasas: 2.2,
        },
        { item: "Salmón fresco", cantidad: "100 g", calorias: 208, proteinas: 25.4, carbohidratos: 0, grasas: 12.4 },
        { item: "Aguacate", cantidad: "50 g", calorias: 80, proteinas: 1, carbohidratos: 4.3, grasas: 7.3 },
        { item: "Alga nori", cantidad: "10 g", calorias: 3, proteinas: 0.6, carbohidratos: 0.4, grasas: 0 },
        { item: "Vinagre de arroz", cantidad: "15 g", calorias: 3, proteinas: 0, carbohidratos: 0.7, grasas: 0 },
      ],
    },
    merienda: {
      nombre: "Tostada integral y huevos duros",
      ingredientes: [
        { item: "Pan integral", cantidad: "40 g", calorias: 96, proteinas: 3.6, carbohidratos: 17.2, grasas: 1.6 },
        { item: "Queso untable descremado", cantidad: "30 g", calorias: 75, proteinas: 9, carbohidratos: 3, grasas: 3 },
        {
          item: "Huevos duros",
          cantidad: "2 unidades (≈100 g)",
          calorias: 155,
          proteinas: 13,
          carbohidratos: 1.1,
          grasas: 11,
        },
      ],
    },
    cena: {
      nombre: "Canelones de ricota y espinaca con salsa fileto",
      ingredientes: [
        {
          item: "Canelones",
          cantidad: "3 unidades (≈90 g)",
          calorias: 315,
          proteinas: 11.7,
          carbohidratos: 63,
          grasas: 1.8,
        },
        { item: "Ricota magra", cantidad: "100 g", calorias: 138, proteinas: 11.4, carbohidratos: 3, grasas: 8 },
        { item: "Espinaca cocida", cantidad: "100 g", calorias: 23, proteinas: 2.9, carbohidratos: 3.6, grasas: 0.4 },
        {
          item: "Salsa fileto casera",
          cantidad: "80 g",
          calorias: 32,
          proteinas: 1.6,
          carbohidratos: 7.2,
          grasas: 0.2,
        },
        {
          item: "Queso rallado light (opcional)",
          cantidad: "20 g",
          calorias: 60,
          proteinas: 6,
          carbohidratos: 1,
          grasas: 3.6,
        },
      ],
    },
  },
}

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const mealTypes = [
  { key: "desayuno", label: "Desayuno", icon: "🌅", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
  { key: "almuerzo", label: "Almuerzo", icon: "☀️", color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100" },
  { key: "merienda", label: "Merienda", icon: "🌤️", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
  { key: "cena", label: "Cena", icon: "🌙", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
]

export default function MealCalendar() {
  const [selectedMeal, setSelectedMeal] = useState<{ day: string; mealType: string } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentDayIndex, setCurrentDayIndex] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    // Convert to our array index (0 = Monday, 1 = Tuesday, etc.)
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1
  })

  // Detect mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleMealClick = (day: string, mealType: string) => {
    if (selectedMeal?.day === day && selectedMeal?.mealType === mealType) {
      setSelectedMeal(null)
    } else {
      setSelectedMeal({ day, mealType })
    }
  }

  const navigateDay = (direction: "prev" | "next") => {
    let newIndex
    if (direction === "prev") {
      newIndex = currentDayIndex === 0 ? days.length - 1 : currentDayIndex - 1
    } else {
      newIndex = currentDayIndex === days.length - 1 ? 0 : currentDayIndex + 1
    }
    setCurrentDayIndex(newIndex)
  }

  const currentDay = days[currentDayIndex]

  const selectedMealData = selectedMeal
    ? mealData[selectedMeal.day as keyof typeof mealData][selectedMeal.mealType as keyof typeof mealData.Lunes]
    : null

  const selectedMealTypeData = selectedMeal ? mealTypes.find((m) => m.key === selectedMeal.mealType) : null

  // Calculate totals for selected meal
  const mealTotals = selectedMealData
    ? selectedMealData.ingredientes.reduce(
        (totals, ingrediente) => ({
          calorias: totals.calorias + ingrediente.calorias,
          proteinas: totals.proteinas + ingrediente.proteinas,
          carbohidratos: totals.carbohidratos + ingrediente.carbohidratos,
          grasas: totals.grasas + ingrediente.grasas,
        }),
        { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      )
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Plan de Comidas Semanal</h1>
          <p className="text-slate-600">Planificación nutricional para toda la semana</p>
        </div>

        {/* Mobile Day Navigation */}
        {isMobile && (
          <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigateDay("prev")} className="h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="text-center">
              <h2 className="text-xl font-semibold">{currentDay}</h2>
              {(() => {
                const today = new Date()
                const dayOfWeek = today.getDay()
                const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
                return (
                  currentDayIndex === todayIndex && (
                    <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded-full">Hoy</span>
                  )
                )
              })()}
            </div>

            <Button variant="ghost" size="icon" onClick={() => navigateDay("next")} className="h-10 w-10">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Desktop Calendar Grid */}
        {!isMobile && (
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden mb-8">
            {/* Header Row */}
            <div className="grid grid-cols-8 bg-slate-100 border-b">
              <div className="p-4 font-semibold text-slate-700 border-r">Comida</div>
              {days.map((day, index) => {
                const today = new Date()
                const dayOfWeek = today.getDay()
                const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
                const isToday = index === todayIndex

                return (
                  <div
                    key={day}
                    className={cn(
                      "p-4 font-semibold text-center border-r last:border-r-0",
                      isToday ? "bg-slate-200 text-slate-900" : "text-slate-700",
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span>{day}</span>
                      {isToday && (
                        <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded-full mt-1">Hoy</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Meal Rows */}
            {mealTypes.map((mealType) => (
              <div key={mealType.key} className="grid grid-cols-8 border-b last:border-b-0">
                {/* Meal Type Label */}
                <div className={cn("p-4 font-medium text-slate-700 border-r flex items-center gap-2", mealType.color)}>
                  <span className="text-lg">{mealType.icon}</span>
                  <div>{mealType.label}</div>
                </div>

                {/* Meal Cards */}
                {days.map((day) => {
                  const meal = mealData[day as keyof typeof mealData][mealType.key as keyof typeof mealData.Lunes]
                  const isSelected = selectedMeal?.day === day && selectedMeal?.mealType === mealType.key
                  const totalCalorias = meal.ingredientes.reduce((sum, ing) => sum + ing.calorias, 0)

                  return (
                    <div
                      key={`${day}-${mealType.key}`}
                      className={cn(
                        "p-3 border-r last:border-r-0 cursor-pointer transition-all duration-200",
                        mealType.color,
                        isSelected && "ring-2 ring-slate-400 bg-slate-100",
                        "hover:shadow-md",
                      )}
                      onClick={() => handleMealClick(day, mealType.key)}
                    >
                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800 text-sm line-clamp-2 leading-tight">{meal.nombre}</h3>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <Utensils className="h-3 w-3" />
                            <span>{meal.ingredientes.length}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            <span>{Math.round(totalCalorias)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}

        {/* Mobile Calendar View */}
        {isMobile && (
          <div className="space-y-4 mb-8">
            {mealTypes.map((mealType) => {
              const meal = mealData[currentDay as keyof typeof mealData][mealType.key as keyof typeof mealData.Lunes]
              const isSelected = selectedMeal?.day === currentDay && selectedMeal?.mealType === mealType.key
              const totalCalorias = meal.ingredientes.reduce((sum, ing) => sum + ing.calorias, 0)

              return (
                <div
                  key={mealType.key}
                  className={cn(
                    "bg-white rounded-xl p-4 shadow-sm border transition-all duration-200",
                    mealType.color,
                    isSelected && "ring-2 ring-slate-400",
                  )}
                  onClick={() => handleMealClick(currentDay, mealType.key)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{mealType.icon}</span>
                    <h3 className="font-semibold text-slate-800">{mealType.label}</h3>
                  </div>

                  <div className="pl-9">
                    <p className="font-medium text-slate-700 mb-1">{meal.nombre}</p>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Utensils className="h-4 w-4" />
                        <span>{meal.ingredientes.length} ingredientes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        <span>{Math.round(totalCalorias)} kcal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Meal Details Modal */}
        {selectedMeal && selectedMealData && selectedMealTypeData && mealTotals && (
          <div
            className={cn(
              "fixed inset-0 bg-black flex items-center justify-center p-4 z-50 transition-all duration-300 ease-out",
              selectedMeal ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0",
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedMeal(null)
              }
            }}
          >
            <div
              className={cn(
                "bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform",
                selectedMeal ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4",
                isMobile ? "max-w-[95%]" : "max-w-3xl",
              )}
            >
              <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between rounded-t-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-bounce">{selectedMealTypeData.icon}</span>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 pr-6">{selectedMealData.nombre}</h2>
                    <p className="text-slate-600 text-sm">
                      {selectedMealTypeData.label} - {selectedMeal.day}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200 hover:scale-110 absolute right-3 top-3"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 md:p-6">
                {/* Nutrition Summary */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Información Nutricional Total
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{Math.round(mealTotals.calorias)}</div>
                      <div className="text-xs text-slate-600">Calorías</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{Math.round(mealTotals.proteinas)}g</div>
                      <div className="text-xs text-slate-600">Proteínas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{Math.round(mealTotals.carbohidratos)}g</div>
                      <div className="text-xs text-slate-600">Carbohidratos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{Math.round(mealTotals.grasas)}g</div>
                      <div className="text-xs text-slate-600">Grasas</div>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Ingredientes y valores nutricionales:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedMealData.ingredientes.map((ingrediente, index) => (
                    <div
                      key={index}
                      className={cn(
                        "bg-slate-50 rounded-lg border hover:bg-slate-100 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md",
                        "animate-in slide-in-from-left-4 fade-in",
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="p-3 md:p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-slate-700 flex-1 text-sm md:text-base">
                            {ingrediente.item}
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-slate-200 text-slate-700 ml-2 text-xs md:text-sm transition-colors duration-200"
                          >
                            {ingrediente.cantidad}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center bg-orange-100 rounded px-2 py-1">
                            <div className="font-semibold text-orange-700">{Math.round(ingrediente.calorias)}</div>
                            <div className="text-orange-600">kcal</div>
                          </div>
                          <div className="text-center bg-blue-100 rounded px-2 py-1">
                            <div className="font-semibold text-blue-700">{Math.round(ingrediente.proteinas)}g</div>
                            <div className="text-blue-600">Prot</div>
                          </div>
                          <div className="text-center bg-green-100 rounded px-2 py-1">
                            <div className="font-semibold text-green-700">{Math.round(ingrediente.carbohidratos)}g</div>
                            <div className="text-green-600">Carb</div>
                          </div>
                          <div className="text-center bg-purple-100 rounded px-2 py-1">
                            <div className="font-semibold text-purple-700">{Math.round(ingrediente.grasas)}g</div>
                            <div className="text-purple-600">Gras</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t animate-in slide-in-from-bottom-4 fade-in duration-500">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Utensils className="h-4 w-4" />
                      Total de ingredientes: {selectedMealData.ingredientes.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Planificación nutricional personalizada • Haz clic en cualquier comida para ver los detalles</p>
        </div>
      </div>
    </div>
  )
}
