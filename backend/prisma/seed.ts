import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'user@email.com',
      password: await bcrypt.hash('12345678', 10),
    }
  });

  const departmentA = await prisma.department.create({
    data: {
      name: "Departamento A", services: {
        createMany: {
          data: [
            { name: 'Compra' },
            { name: 'Venda' },
            { name: 'Troca' },
          ]
        },
      }
    },
    include: {
      services: true
    }
  });

  const departmentB = await prisma.department.create({
    data: {
      name: "Departamento B", services: {
        createMany: {
          data: [
            { name: 'Compra' },
            { name: 'Venda' },
            { name: 'Troca' },
          ]
        },
      }
    },
    include: {
      services: true
    }
  });

  const kpiTypes = await prisma.kpiType.createManyAndReturn({
    data: [
      { name: 'TOTAL_VALUE', sort: 1 },
      { name: 'ACTIVE_CONTRACTS_COUNT', sort: 2 },
      { name: 'ACTIVE_COMPANIES_COUNT', sort: 3 },
      { name: 'MEAN_CONTRACTS_BY_COMPANIES', sort: 4 }
    ]
  });

  const now = new Date();
  const oneDayAfterNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const kpis = await prisma.kpi.createManyAndReturn({
    data: [
      { value: 0, type: 'TOTAL_VALUE', created_at: now },
      { value: 0, type: 'ACTIVE_CONTRACTS_COUNT', created_at: now },
      { value: 0, type: 'ACTIVE_COMPANIES_COUNT', created_at: now },
      { value: 0, type: 'MEAN_CONTRACTS_BY_COMPANIES', created_at: now },
      // One day after
      { value: 10000.58, type: 'TOTAL_VALUE', created_at: oneDayAfterNow },
      { value: 17, type: 'ACTIVE_CONTRACTS_COUNT', created_at: oneDayAfterNow },
      { value: 5, type: 'ACTIVE_COMPANIES_COUNT', created_at: oneDayAfterNow },
      { value: 3.4, type: 'MEAN_CONTRACTS_BY_COMPANIES', created_at: oneDayAfterNow },
    ]
  });

  console.log({ user, departmentA, departmentB, kpiTypes, kpis });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })