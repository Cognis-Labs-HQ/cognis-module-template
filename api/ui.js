import path from "node:path";

export function registerUi(ctx) {
    ctx.registerStaticDirectory("", path.join(ctx.moduleRoot, "ui"));
    ctx.registerSpaRoute({
        id: "module-template-showcase",
        pattern: "^/showcase$",
        base: "/showcase",
        scriptUrl: "/static/modules/module-template/app.js",
        stylesheets: ["/static/modules/module-template/styles/showcase.css"],
        access: { minRole: "user" },
    });
    ctx.registerNavbarPlugin({
        scriptUrl: "/static/modules/module-template/navbar.js",
        access: { minRole: "user" },
    });
}
