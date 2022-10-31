import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '@actors';
import { IGetExerciseResponse, IGetExercisesResponse } from '@usecases';

export async function exerciseController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.get(
    '/exercises',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = new User(opts.exerciseRepository);
        await user
          .getExercises({})
          .catch((error) => {
            reply.status(500).send(error);
          })
          .then((resolve: void | IGetExercisesResponse) => {
            reply.status(200).send(resolve);
          });
      } catch (error) {
        reply.status(500).send();
      }
    },
  );

  fastify.get(
    '/exercises/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const user: User = new User(opts.exerciseRepository);
        if (id == undefined || id == '') {
          reply.status(400).send();
          return;
        }

        await user
          .getExercise({ id })
          .catch((error) => {
            reply.status(500).send(error);
          })
          .then((resolve: void | IGetExerciseResponse) => {
            const response = resolve as IGetExerciseResponse;

            if (response.exercise == undefined) {
              reply.status(404).send();
            } else {
              reply.status(200).send(response);
            }
          });
      } catch (error) {
        reply.status(500).send();
      }
    },
  );
}
