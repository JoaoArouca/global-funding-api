import { preUser } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    preUser: preUser
  }
}
