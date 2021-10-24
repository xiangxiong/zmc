"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationMetadataBooter = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const keys_1 = require("../keys");
const path = require("path");
const debug = (0, debug_1.default)('loopback:boot:booter:application-metadata');
/**
 *
 * Configure the application with metadata from `package.json`
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project
 */
let ApplicationMetadataBooter = class ApplicationMetadataBooter {
    constructor(app, projectRoot) {
        this.app = app;
        this.projectRoot = projectRoot;
    }
    async configure() {
        try {
            // `this.projectRoot` points to `<project>/dist`
            const pkg = require(path.resolve(this.projectRoot, '../package.json'));
            this.app.setMetadata(pkg);
        }
        catch (err) {
            debug('package.json not found', err);
        }
    }
};
ApplicationMetadataBooter = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(keys_1.BootBindings.PROJECT_ROOT)),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Application, String])
], ApplicationMetadataBooter);
exports.ApplicationMetadataBooter = ApplicationMetadataBooter;
//# sourceMappingURL=application-metadata.booter.js.map