"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHasManyThroughInclusionResolver = void 0;
const tslib_1 = require("tslib");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const relation_helpers_1 = require("../relation.helpers");
const has_many_helpers_1 = require("./has-many.helpers");
const debug = (0, debug_1.default)('loopback:repository:relations:has-many-through:inclusion-resolver');
/**
 * Creates InclusionResolver for HasManyThrough relation.
 * Notice that this function only generates the inclusionResolver.
 * It doesn't register it for the source repository.
 *
 *
 * @param meta - metadata of the hasMany relation (including through)
 * @param getThroughRepo - through repository getter i.e. where through
 * instances are
 * @param getTargetRepo - target repository getter i.e where target instances
 * are
 */
function createHasManyThroughInclusionResolver(meta, getThroughRepo, getTargetRepo) {
    const relationMeta = (0, has_many_helpers_1.resolveHasManyMetadata)(meta);
    return async function fetchHasManyThroughModels(entities, inclusion, options) {
        if (!entities.length)
            return [];
        debug('Fetching target models for entities:', entities);
        debug('Relation metadata:', relationMeta);
        const sourceKey = relationMeta.keyFrom;
        const sourceIds = entities.map(e => e[sourceKey]);
        const targetKey = relationMeta.keyTo;
        if (!relationMeta.through) {
            throw new Error(`relationMeta.through must be defined on ${relationMeta}`);
        }
        const throughKeyTo = relationMeta.through.keyTo;
        const throughKeyFrom = relationMeta.through.keyFrom;
        debug('Parameters:', {
            sourceKey,
            sourceIds,
            targetKey,
            throughKeyTo,
            throughKeyFrom,
        });
        debug('sourceId types', sourceIds.map(i => typeof i));
        const throughRepo = await getThroughRepo();
        const targetRepo = await getTargetRepo();
        // find through models
        const throughFound = await (0, relation_helpers_1.findByForeignKeys)(throughRepo, throughKeyFrom, sourceIds, {}, // scope will be applied at the target level
        options);
        const throughResult = (0, relation_helpers_1.flattenTargetsOfOneToManyRelation)(sourceIds, throughFound, throughKeyFrom);
        const result = [];
        const scope = typeof inclusion === 'string' ? {} : inclusion.scope;
        // convert from through entities to the target entities
        for (const entityList of throughResult) {
            if (entityList) {
                // get target ids from the through entities by foreign key
                const targetIds = entityList.map(entity => entity[throughKeyTo]);
                // the explicit types and casts are needed
                const targetEntityList = await (0, relation_helpers_1.findByForeignKeys)(targetRepo, targetKey, targetIds, scope, {
                    ...options,
                    isThroughModelInclude: true,
                });
                result.push(targetEntityList);
            }
            else {
                // no entities found, add undefined to results
                result.push(entityList);
            }
        }
        debug('fetchHasManyThroughModels result', result);
        return result;
    };
}
exports.createHasManyThroughInclusionResolver = createHasManyThroughInclusionResolver;
//# sourceMappingURL=has-many-through.inclusion-resolver.js.map