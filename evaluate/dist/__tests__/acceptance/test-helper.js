"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApplication = void 0;
const testlab_1 = require("@loopback/testlab");
const __1 = require("../..");
async function setupApplication() {
    const app = new __1.TodoListApplication({
        rest: (0, testlab_1.givenHttpServerConfig)(),
    });
    await app.boot();
    await app.start();
    const client = (0, testlab_1.createRestAppClient)(app);
    return { app, client };
}
exports.setupApplication = setupApplication;
//# sourceMappingURL=test-helper.js.map