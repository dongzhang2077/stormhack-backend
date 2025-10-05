import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.source.deleteMany();
  await prisma.diseaseIngredient.deleteMany();
  await prisma.ingredientBenefit.deleteMany();
  await prisma.ingredientInteraction.deleteMany();
  await prisma.disease.deleteMany();
  await prisma.ingredient.deleteMany();

  console.log("✅ Cleared existing data");

  // Create ingredients
  const milk = await prisma.ingredient.create({
    data: { name: "milk", category: "dairy" },
  });

  const citrus = await prisma.ingredient.create({
    data: { name: "citrus", category: "fruit" },
  });

  const oats = await prisma.ingredient.create({
    data: { name: "oats", category: "grain" },
  });

  const spinach = await prisma.ingredient.create({
    data: { name: "spinach", category: "vegetable" },
  });

  const bacon = await prisma.ingredient.create({
    data: { name: "bacon", category: "meat" },
  });

  const whiteBread = await prisma.ingredient.create({
    data: { name: "white bread", category: "grain" },
  });

  const wholeGrains = await prisma.ingredient.create({
    data: { name: "whole grains", category: "grain" },
  });

  const leafyGreens = await prisma.ingredient.create({
    data: { name: "leafy greens", category: "vegetable" },
  });

  const nuts = await prisma.ingredient.create({
    data: { name: "unsalted nuts", category: "protein" },
  });

  const lowFatDairy = await prisma.ingredient.create({
    data: { name: "low-fat dairy", category: "dairy" },
  });

  console.log("✅ Created ingredients");

  // Create ingredient interactions (avoid)
  await prisma.ingredientInteraction.create({
    data: {
      ingredientAId: milk.id,
      ingredientBId: citrus.id,
      reason: "May cause digestion issues and stomach discomfort",
      severity: 3,
      sources: {
        create: [
          {
            label: "Nutrition Journal, 2020",
            url: "https://example.com/nutrition-milk-citrus",
          },
        ],
      },
    },
  });

  await prisma.ingredientInteraction.create({
    data: {
      ingredientAId: milk.id,
      ingredientBId: spinach.id,
      reason: "Iron absorption may be reduced",
      severity: 2,
      sources: {
        create: [
          {
            label: "American Journal of Clinical Nutrition, 2019",
            url: "https://example.com/iron-absorption",
          },
        ],
      },
    },
  });

  console.log("✅ Created ingredient interactions");

  // Create ingredient benefits
  await prisma.ingredientBenefit.create({
    data: {
      ingredientAId: milk.id,
      ingredientBId: oats.id,
      reason: "Balanced protein and carbohydrates for sustained energy",
      severity: 2,
      sources: {
        create: [
          {
            label: "Food Science Journal, 2021",
            url: "https://example.com/milk-oats-benefits",
          },
        ],
      },
    },
  });

  console.log("✅ Created ingredient benefits");

  // Create diseases
  const diabetes = await prisma.disease.create({
    data: {
      name: "diabetes",
      description:
        "A metabolic disorder characterized by high blood sugar levels",
    },
  });

  const hypertension = await prisma.disease.create({
    data: {
      name: "hypertension",
      description: "High blood pressure condition",
    },
  });

  const heartDisease = await prisma.disease.create({
    data: {
      name: "heart disease",
      description: "Cardiovascular conditions affecting heart function",
    },
  });

  console.log("✅ Created diseases");

  // Create disease-ingredient relationships (AVOID)
  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: diabetes.id,
      ingredientId: whiteBread.id,
      type: "AVOID",
      reason: "High glycemic index causes rapid blood sugar spikes",
      severity: 5,
      sources: {
        create: [
          {
            label: "American Diabetes Association Guidelines, 2023",
            url: "https://diabetes.org/guidelines",
          },
        ],
      },
    },
  });

  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: diabetes.id,
      ingredientId: bacon.id,
      type: "AVOID",
      reason: "High in saturated fats and sodium",
      severity: 4,
      sources: {
        create: [
          {
            label: "ADA Nutrition Guidelines, 2023",
          },
        ],
      },
    },
  });

  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: hypertension.id,
      ingredientId: bacon.id,
      type: "AVOID",
      reason: "Very high sodium content increases blood pressure",
      severity: 5,
      sources: {
        create: [
          {
            label: "American Heart Association, 2023",
            url: "https://heart.org/sodium",
          },
        ],
      },
    },
  });

  console.log("✅ Created disease avoid relationships");

  // Create disease-ingredient relationships (BENEFICIAL)
  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: diabetes.id,
      ingredientId: wholeGrains.id,
      type: "BENEFICIAL",
      reason: "Low glycemic index helps maintain stable blood sugar",
      severity: 3,
      sources: {
        create: [
          {
            label: "Journal of Nutrition, 2022",
            url: "https://example.com/whole-grains-diabetes",
          },
        ],
      },
    },
  });

  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: diabetes.id,
      ingredientId: leafyGreens.id,
      type: "BENEFICIAL",
      reason: "Rich in fiber and nutrients, minimal impact on blood sugar",
      severity: 2,
      sources: {
        create: [
          {
            label: "Diabetes Care Journal, 2021",
          },
        ],
      },
    },
  });

  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: hypertension.id,
      ingredientId: nuts.id,
      type: "BENEFICIAL",
      reason: "Heart-healthy fats help lower blood pressure",
      severity: 3,
      sources: {
        create: [
          {
            label: "Circulation Journal, 2022",
            url: "https://example.com/nuts-hypertension",
          },
        ],
      },
    },
  });

  await prisma.diseaseIngredient.create({
    data: {
      diseaseId: hypertension.id,
      ingredientId: lowFatDairy.id,
      type: "BENEFICIAL",
      reason: "Calcium and potassium support healthy blood pressure",
      severity: 2,
      sources: {
        create: [
          {
            label: "DASH Diet Study, 2020",
            url: "https://example.com/dash-diet",
          },
        ],
      },
    },
  });

  console.log("✅ Created disease beneficial relationships");
  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
