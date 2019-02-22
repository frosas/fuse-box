import { resolveModule } from "../../resolver";
import * as path from "path";

const cases = path.join(__dirname, "cases/");

describe("Resolver test", () => {
	describe("External modules", () => {
		it("Should resolve external target", () => {
			const info = resolveModule({ target: "http://foo.com/some.js" });
			expect(info).toEqual({ isExternal: true });
		});
	});

	describe("Folder resolution", () => {
		const homeDir = path.join(cases, "src1");
		const filePath = path.join(homeDir, "foo.js");

		it("Should resolve index.js", () => {
			const info = resolveModule({
				homeDir: homeDir,
				filePath: filePath,
				target: "./some1",
			});
			expect(info.extension).toEqual(".js");
			expect(info.fuseBoxPath).toEqual("some1/index.js");
			expect(info.absPath).toContain("cases/src1/some1/index.js");
		});

		it("Should resolve index.jsx", () => {
			const info = resolveModule({
				homeDir: homeDir,
				filePath: filePath,
				target: "./some2",
			});
			expect(info.extension).toEqual(".jsx");
			expect(info.fuseBoxPath).toEqual("some2/index.jsx");
			expect(info.absPath).toContain("cases/src1/some2/index.jsx");
		});

		it("Should resolve index.ts", () => {
			const info = resolveModule({
				homeDir: homeDir,
				filePath: filePath,
				target: "./some3",
			});
			expect(info.extension).toEqual(".ts");
			expect(info.fuseBoxPath).toEqual("some3/index.js");
			expect(info.absPath).toContain("cases/src1/some3/index.ts");
		});

		it("Should resolve index.tsx", () => {
			const info = resolveModule({
				homeDir: homeDir,
				filePath: filePath,
				target: "./some4",
			});
			expect(info.extension).toEqual(".tsx");
			expect(info.fuseBoxPath).toEqual("some4/index.jsx");
			expect(info.absPath).toContain("cases/src1/some4/index.tsx");
		});

		it("Should resolve with package override", () => {
			const info = resolveModule({
				homeDir: homeDir,
				filePath: filePath,
				target: "./some5",
			});
			// here is basically it needs to contain an alias...
			// we need to detect if there was a package.json on the way
		});
	});

	describe("Package resolution", () => {
		const homeDir = path.join(cases, "src1");
		const filePath = path.join(homeDir, "foo.js");
		describe("From the current project", () => {
			it("should resolve a simple package", () => {
				// require("foo")
				// should be tested for package, version e.t.c
				// should give IResolverPackage
			});

			it("should resolve a simple package with partial require", () => {
				// require("foo/bar")
				// should give IResolverPackage
				// packagePartial and isPackageEntry (if it's the same)
			});

			it("should resolve a simple package with partial require with extension", () => {
				// require("foo/bar.js")
				// should give IResolverPackage
				// packagePartial and isPackageEntry (if it's the same)
			});

			it("should resolve a simple package with partial require on a folder", () => {
				// require("foo/some_folder")
				// should give IResolverPackage
				// packagePartial and isPackageEntry (if it's the same)
			});

			it("should resolve a scoped package", () => {
				// require("@scoped/some")
				// should give IResolverPackage
			});

			it("should resolve a scoped package with ext", () => {
				// require("@scoped/some/foo.js")
				// should give IResolverPackage
			});
		});

		describe("From existing package", () => {
			it("should resolve a file being in a package", () => {
				const info = resolveModule({
					homeDir: homeDir,
					package: {
						name: "foo",
						main: "index.js",
						version: "1.0.0",
					},
					filePath: "/node_modules/thatfile.js",
					target: "./some5",
				});
			});

			it("should resolve a file being in a package with browser fields", () => {
				const info = resolveModule({
					homeDir: homeDir,
					package: {
						name: "foo",
						main: "index.js",
						version: "1.0.0",
						browser: {
							foo: "false",
						},
					},
					filePath: "/node_modules/thatfile.js",
					target: "./foo",
				});
				// should give "fuse-empty-package" as an alias here
			});
		});
	});
});
