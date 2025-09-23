import Knex from 'knex';
import { Model } from 'objection';
import db, { baseConfigSpro } from './db';

export const knex = Knex(db);
export const sproKnex = Knex(baseConfigSpro);

Model.knex(knex); // padrão do model
