import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';

export async function exerciseController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.get(
    '/exercises',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = new User(opts.exerciseRepository);
      await user
        .getExercises({})
        .catch((error) => {
          reply.status(500).send(error);
        })
        .then((result) => {
          reply.status(200).send(result);
        });
    },
  );

  fastify.get(
    '/exercises/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const user: User = new User(opts.exerciseRepository);
      if (id == undefined || id == '') {
        reply.status(400).send();
        return;
      }

      await user
        .getExercise({ id })
        .catch((error) => {
          reply.send(500).send(error);
        })
        .then((result) => {
          reply.status(200).send(result);
        });
    },
  );
}
