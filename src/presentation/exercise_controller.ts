import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application/actors';
import {
  IGetAnExerciseResponse,
  IGetAllExercisesResponse,
} from '../application/usecases';

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
          .then((resolve: IGetAllExercisesResponse) => {
            // Promise resolved with a response
            reply.status(200).send(resolve.exercises);
          })
          .catch((error) => {
            // Promise rejected or an exception was thrown
            reply.status(500).send(error);
          });
      } catch (error) {
        // Other than getExercises might cause an exception
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
          // An ID is required for the request to be valid (400 bad request)
          reply.status(400).send();
          return;
        }

        await user
          .getExercise({ id })
          .then((resolve: IGetAnExerciseResponse) => {
            const response = resolve as IGetAnExerciseResponse;

            if (response.exercise == undefined) {
              // Repository returned undefined which means that the exercise could not be found
              reply.status(404).send();
            } else {
              // The exercise was found so we return 200 OK
              reply.status(200).send(response.exercise);
            }
          })
          .catch((error) => {
            // Promise was rejected or an exception was thrown
            reply.status(500).send(error);
          });
      } catch (error) {
        // Other than getExercise might cause an exception
        reply.status(500).send();
      }
    },
  );
}
