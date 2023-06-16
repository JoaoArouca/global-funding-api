import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const countries = [
  'Brasil',
  'Alemanha',
  'Canada',
  'Europa',
  'França',
  'Irlanda',
  'USA',
  'Reino Unido',
  'Outros países',
]
const sectors = [
  'Aeronáutica',
  'Agricultura',
  'Alimentos e bebidas',
  'Artes',
  'Automotivo',
  'Bens de Consumo',
  'Biotecnologia',
  'Construção Civil e Engenharia',
  'Cosmético',
  'Ecologia e Meio Ambiente',
  'Educação',
  'Eletrônico',
  'Energia',
  'Espaço e Defesa',
  'Farmacêutico',
  'Financeiro',
  'Indústria',
  'Jogos e entretenimento',
  'Logística',
  'Manufatura',
  'Mídia',
  'Mobilidade e Transporte',
  'Não especificado',
  'Papel e Celulose',
  'Química e Petroquímica',
  'Saneamento e Resíduos',
  'Saúde',
  'Siderurgia, Metalurgia e Mineração',
  'Social',
  'Telecomunicações',
  'TI',
  'Turismo',
]

const regions = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Centro-Oeste',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Nacional',
  'Nordeste',
  'Norte',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Sudeste',
  'Sul',
  'Tocantins',
]

const organizations = [
  'Grande',
  'ICTs',
  'Média',
  'Organizações sem fins lucrativos',
  'Pequena',
  'Startup',
  'Todas',
]

const partnerTypeEntities = [
  'Empresa',
  'ICT',
  'Startup',
  'Não se aplica',
  'Não especificado',
]

const technologies = [
  'Biotecnologia',
  'ADAS - Advanced Driver, Assistance Systems',
  'Biocombustíveis',
  'Cibersegurança',
  'Cidades Inteligentes',
  'Ciência de Dados',
  'Cloud',
  'Conectividade',
  'Cultura',
  'Deep learning',
  'Descarbonização',
  'Desenvolvimento Sustentável',
  'Design',
  'Digital Twins',
  'Dinâmica veicular',
  'Dispositivos agrícolas',
  'Economia Circular',
  'Educação',
  'Eficiência Energética',
  'Energia Limpa',
  'Gestão e Governança',
  'Hidrogênio',
  'Indústria 4.0 ou 5.0',
  'Infraestrutura',
  'Inteligência Artificial',
  'IoT',
  'Logística',
  'Machine Learning',
  'Manufatura',
  'Materiais',
  'Mobilidade e Transporte',
  'Modelagem numérica',
  'Nanotecnologia',
  'Não especificado',
  'Powertrain Alternativo',
  'Preservação dos Recursos Hídricos',
  'Preservação/Recuperação Ecológica',
  'Propriedade Intelectual',
  'Quântica',
  'Química Verde',
  'Saneamento e Resíduos',
  'Saúde',
  'Segurança veicular',
  'Sistemas Agroflorestais/ILP',
  'Social',
  'Socioambiental',
  'Sustentabilidade Urbana',
  'Transformação digital',
]
async function seed() {
  await Promise.all(
    countries.map(async (country) => {
      await prisma.country.create({
        data: {
          name: country,
        },
      })
    }),
  )

  await Promise.all(
    sectors.map(async (sector) => {
      await prisma.sector.create({
        data: {
          name: sector,
        },
      })
    }),
  )

  await Promise.all(
    regions.map(async (region) => {
      await prisma.region.create({
        data: {
          name: region,
        },
      })
    }),
  )

  await Promise.all(
    organizations.map(async (organization) => {
      await prisma.organization.create({
        data: {
          name: organization,
        },
      })
    }),
  )

  await Promise.all(
    partnerTypeEntities.map(async (partner) => {
      await prisma.partnerType.create({
        data: {
          name: partner,
        },
      })
    }),
  )

  await Promise.all(
    technologies.map(async (technology) => {
      await prisma.technology.create({
        data: {
          name: technology,
        },
      })
    }),
  )
  await prisma.preUser.createMany({
    data: [
      {
        email: 'joao.arouca@abgi-brasil.com',
        isActive: true,
        isReviewer: false,
        name: 'João Victor',
      },
      {
        email: 'jarouca21@gmail.com',
        isActive: true,
        isReviewer: true,
        name: 'João',
      },
      {
        email: 'joão@email.com',
        isActive: true,
        isReviewer: false,
        name: 'joão victor arouca',
      },
    ],
  })
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
