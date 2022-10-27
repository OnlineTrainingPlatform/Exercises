import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';

export async function exerciseController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.get(
    '/exercises',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(opts);
      const user = new User(opts.exerciseRepository);
      await user.getExercises({})
        .catch((error) => {
          reply.status(500).send(error);
        }).then((result) => {
          reply.status(200).send(result);
        })
    },
  );

  fastify.get(
    '/exercises/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const user: User = new User(opts.exerciseRepository);
      const exercise = await user.getExercise({ id });
      reply.send(exercise);
    },
  );
}
