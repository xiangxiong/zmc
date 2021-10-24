import { Count, DataObject, Entity, EntityCrudRepository, Filter, Getter, Options, Where } from '../..';
/**
 * CRUD operations for a target repository of a HasManyThrough relation
 *
 * EXPERIMENTAL: This interface is not stable and may change in the near future.
 * Backwards-incompatible changes may be introduced in semver-minor versions.
 */
export interface HasManyThroughRepository<Target extends Entity, TargetID, Through extends Entity> {
    /**
     * Create a target model instance
     * @param targetModelData - The target model data
     * @param options - Options for the operation
     * @returns A promise which resolves to the newly created target model instance
     */
    create(targetModelData: DataObject<Target>, options?: Options & {
        throughData?: DataObject<Through>;
        throughOptions?: Options;
    }): Promise<Target>;
    /**
     * Find target model instance(s)
     * @param filter - A filter object for where, order, limit, etc.
     * @param options - Options for the operation
     * @returns A promise which resolves with the found target instance(s)
     */
    find(filter?: Filter<Target>, options?: Options & {
        throughOptions?: Options;
    }): Promise<Target[]>;
    /**
     * Delete multiple target model instances
     * @param where - Instances within the where scope are deleted
     * @param options
     * @returns A promise which resolves the deleted target model instances
     */
    delete(where?: Where<Target>, options?: Options & {
        throughOptions?: Options;
    }): Promise<Count>;
    /**
     * Patch multiple target model instances
     * @param dataObject - The fields and their new values to patch
     * @param where - Instances within the where scope are patched
     * @param options
     * @returns A promise which resolves the patched target model instances
     */
    patch(dataObject: DataObject<Target>, where?: Where<Target>, options?: Options & {
        throughOptions?: Options;
    }): Promise<Count>;
    /**
     * Creates a new many-to-many association to an existing target model instance
     * @param targetModelId - The target model ID to link
     * @param options
     * @returns A promise which resolves to the linked target model instance
     */
    link(targetModelId: TargetID, options?: Options & {
        throughData?: DataObject<Through>;
        throughOptions?: Options;
    }): Promise<void>;
    /**
     * Removes an association to an existing target model instance
     * @param targetModelId - The target model to unlink
     * @param options
     * @returns A promise which resolves to null
     */
    unlink(targetModelId: TargetID, options?: Options & {
        throughOptions?: Options;
    }): Promise<void>;
    /**
     * Remove all association to an existing target model instance
     * @param options
     * @return A promise which resolves to void
     */
    unlinkAll(options?: Options & {
        throughOptions?: Options;
    }): Promise<void>;
}
/**
 * a class for CRUD operations for hasManyThrough relation.
 *
 * Warning: The hasManyThrough interface is experimental and is subject to change.
 * If backwards-incompatible changes are made, a new major version may not be
 * released.
 */
export declare class DefaultHasManyThroughRepository<TargetEntity extends Entity, TargetID, TargetRepository extends EntityCrudRepository<TargetEntity, TargetID>, ThroughEntity extends Entity, ThroughID, ThroughRepository extends EntityCrudRepository<ThroughEntity, ThroughID>> implements HasManyThroughRepository<TargetEntity, TargetID, ThroughEntity> {
    getTargetRepository: Getter<TargetRepository>;
    getThroughRepository: Getter<ThroughRepository>;
    getTargetConstraintFromThroughModels: (throughInstances: ThroughEntity[]) => DataObject<TargetEntity>;
    getTargetKeys: (throughInstances: ThroughEntity[]) => TargetID[];
    getThroughConstraintFromSource: () => DataObject<ThroughEntity>;
    getTargetIds: (targetInstances: TargetEntity[]) => TargetID[];
    getThroughConstraintFromTarget: (targetID: TargetID[]) => DataObject<ThroughEntity>;
    constructor(getTargetRepository: Getter<TargetRepository>, getThroughRepository: Getter<ThroughRepository>, getTargetConstraintFromThroughModels: (throughInstances: ThroughEntity[]) => DataObject<TargetEntity>, getTargetKeys: (throughInstances: ThroughEntity[]) => TargetID[], getThroughConstraintFromSource: () => DataObject<ThroughEntity>, getTargetIds: (targetInstances: TargetEntity[]) => TargetID[], getThroughConstraintFromTarget: (targetID: TargetID[]) => DataObject<ThroughEntity>);
    create(targetModelData: DataObject<TargetEntity>, options?: Options & {
        throughData?: DataObject<ThroughEntity>;
        throughOptions?: Options;
    }): Promise<TargetEntity>;
    find(filter?: Filter<TargetEntity>, options?: Options & {
        throughOptions?: Options;
    }): Promise<TargetEntity[]>;
    delete(where?: Where<TargetEntity>, options?: Options & {
        throughOptions?: Options;
    }): Promise<Count>;
    patch(dataObject: DataObject<TargetEntity>, where?: Where<TargetEntity>, options?: Options & {
        throughOptions?: Options;
    }): Promise<Count>;
    link(targetId: TargetID, options?: Options & {
        throughData?: DataObject<ThroughEntity>;
        throughOptions?: Options;
    }): Promise<void>;
    unlink(targetId: TargetID, options?: Options & {
        throughOptions?: Options;
    }): Promise<void>;
    unlinkAll(options?: Options & {
        throughOptions?: Options;
    }): Promise<void>;
}
