"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHasManyThroughRepository = void 0;
const __1 = require("../..");
/**
 * a class for CRUD operations for hasManyThrough relation.
 *
 * Warning: The hasManyThrough interface is experimental and is subject to change.
 * If backwards-incompatible changes are made, a new major version may not be
 * released.
 */
class DefaultHasManyThroughRepository {
    constructor(getTargetRepository, getThroughRepository, getTargetConstraintFromThroughModels, getTargetKeys, getThroughConstraintFromSource, getTargetIds, getThroughConstraintFromTarget) {
        this.getTargetRepository = getTargetRepository;
        this.getThroughRepository = getThroughRepository;
        this.getTargetConstraintFromThroughModels = getTargetConstraintFromThroughModels;
        this.getTargetKeys = getTargetKeys;
        this.getThroughConstraintFromSource = getThroughConstraintFromSource;
        this.getTargetIds = getTargetIds;
        this.getThroughConstraintFromTarget = getThroughConstraintFromTarget;
    }
    async create(targetModelData, options) {
        const targetRepository = await this.getTargetRepository();
        const targetInstance = await targetRepository.create(targetModelData, options);
        await this.link(targetInstance.getId(), options);
        return targetInstance;
    }
    async find(filter, options) {
        const targetRepository = await this.getTargetRepository();
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const throughInstances = await throughRepository.find((0, __1.constrainFilter)(undefined, sourceConstraint), options === null || options === void 0 ? void 0 : options.throughOptions);
        const targetConstraint = this.getTargetConstraintFromThroughModels(throughInstances);
        return targetRepository.find((0, __1.constrainFilter)(filter, targetConstraint), options);
    }
    async delete(where, options) {
        const targetRepository = await this.getTargetRepository();
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const throughInstances = await throughRepository.find((0, __1.constrainFilter)(undefined, sourceConstraint), options === null || options === void 0 ? void 0 : options.throughOptions);
        if (where) {
            // only delete related through models
            // TODO(Agnes): this performance can be improved by only fetching related data
            // TODO: add target ids to the `where` constraint
            const targets = await targetRepository.find({ where });
            const targetIds = this.getTargetIds(targets);
            if (targetIds.length > 0) {
                const targetConstraint = this.getThroughConstraintFromTarget(targetIds);
                const constraints = { ...targetConstraint, ...sourceConstraint };
                await throughRepository.deleteAll((0, __1.constrainDataObject)({}, constraints), options === null || options === void 0 ? void 0 : options.throughOptions);
            }
        }
        else {
            // otherwise, delete through models that relate to the sourceId
            const targetFkValues = this.getTargetKeys(throughInstances);
            // delete through instances that have the targets that are going to be deleted
            const throughFkConstraint = this.getThroughConstraintFromTarget(targetFkValues);
            await throughRepository.deleteAll((0, __1.constrainWhereOr)({}, [sourceConstraint, throughFkConstraint]));
        }
        // delete target(s)
        const targetConstraint = this.getTargetConstraintFromThroughModels(throughInstances);
        return targetRepository.deleteAll((0, __1.constrainWhere)(where, targetConstraint), options);
    }
    // only allows patch target instances for now
    async patch(dataObject, where, options) {
        const targetRepository = await this.getTargetRepository();
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const throughInstances = await throughRepository.find((0, __1.constrainFilter)(undefined, sourceConstraint), options === null || options === void 0 ? void 0 : options.throughOptions);
        const targetConstraint = this.getTargetConstraintFromThroughModels(throughInstances);
        return targetRepository.updateAll((0, __1.constrainDataObject)(dataObject, targetConstraint), (0, __1.constrainWhere)(where, targetConstraint), options);
    }
    async link(targetId, options) {
        var _a;
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const targetConstraint = this.getThroughConstraintFromTarget([targetId]);
        const constraints = { ...targetConstraint, ...sourceConstraint };
        await throughRepository.create((0, __1.constrainDataObject)((_a = options === null || options === void 0 ? void 0 : options.throughData) !== null && _a !== void 0 ? _a : {}, constraints), options === null || options === void 0 ? void 0 : options.throughOptions);
    }
    async unlink(targetId, options) {
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const targetConstraint = this.getThroughConstraintFromTarget([targetId]);
        const constraints = { ...targetConstraint, ...sourceConstraint };
        await throughRepository.deleteAll((0, __1.constrainDataObject)({}, constraints), options === null || options === void 0 ? void 0 : options.throughOptions);
    }
    async unlinkAll(options) {
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const throughInstances = await throughRepository.find((0, __1.constrainFilter)(undefined, sourceConstraint), options === null || options === void 0 ? void 0 : options.throughOptions);
        const targetFkValues = this.getTargetKeys(throughInstances);
        const targetConstraint = this.getThroughConstraintFromTarget(targetFkValues);
        const constraints = { ...targetConstraint, ...sourceConstraint };
        await throughRepository.deleteAll((0, __1.constrainDataObject)({}, constraints), options === null || options === void 0 ? void 0 : options.throughOptions);
    }
}
exports.DefaultHasManyThroughRepository = DefaultHasManyThroughRepository;
//# sourceMappingURL=has-many-through.repository.js.map