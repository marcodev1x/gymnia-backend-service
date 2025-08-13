import Knex from 'knex';
import { Model } from 'objection';
import db from './db';

export const knex = Knex(db);

Model.knex(knex);
