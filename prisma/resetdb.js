const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database ebook_backend')
  await prisma.$executeRawUnsafe('CREATE Database ebook_backend')
}
console.log('Done Reset DB!!')
run()