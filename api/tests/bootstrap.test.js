import assert from "node:assert/strict";
import test from "node:test";
import { bootstrapModule } from "../../bootstrap.js";

function createContext(registrations) {
    return {
        moduleRoot: process.cwd(),
        router: {
            get(path) {
                registrations.routes.push(path);
            },
            post(path) {
                registrations.routes.push(path);
            },
        },
        getCapability(name) {
            if (name === "auth:requireAuth") return () => ({ role: "user" });
            if (name === "db:executor") {
                return {
                    ensureTable() {},
                    executeCommand() {
                        return { rows: [] };
                    },
                };
            }
            assert.fail(`Unexpected capability: ${name}`);
        },
        registerStaticDir() {},
        registerSpaRoute(route) {
            registrations.routes.push(route.base);
        },
        registerNavbarPlugin() {},
        contributePublicCapability(name, value) {
            registrations.capabilities.push([name, value]);
        },
        registerFlow(flow) {
            registrations.flows.push(flow);
        },
        flow: {
            exists() {
                return false;
            },
            extend(...args) {
                registrations.extensions.push(args);
            },
        },
        log() {},
    };
}

test("registers template surfaces through ctx", () => {
    const registrations = {
        routes: [],
        capabilities: [],
        extensions: [],
        flows: [],
    };
    bootstrapModule(createContext(registrations));

    assert.ok(registrations.routes.includes("/showcase"));
    assert.equal(registrations.capabilities[0][0], "showcase:listItems");
    assert.equal(registrations.flows[0].id, "showcase-items");
    assert.equal(registrations.extensions[0][0], "showcase-items");
});
