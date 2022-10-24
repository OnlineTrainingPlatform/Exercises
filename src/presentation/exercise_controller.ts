import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';

export async function exerciseController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.get(
    '/exercises',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = new User();
      reply.send(await user.getExercises({}));
    },
  );

  fastify.get(
    '/exercises/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const user: User = new User();
      const exercise = await user.getExercise({ id });
      reply.send(exercise);
    },
  );
}
