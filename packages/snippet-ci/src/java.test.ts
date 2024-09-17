import { describe, expect, it } from '@jest/globals';
import { exec } from 'child_process';
import { globSync } from 'glob';
import * as path from 'path';
import * as util from "util";

const execAsync = util.promisify(exec);


describe("java snippets", () => {
    const javaFiles = globSync(path.resolve('../../snippets/java/app/src/**/*.java'), { absolute: false })

    it("file snapshot", async () => {
        expect(javaFiles).toMatchSnapshot();
    });


    it.concurrent.each(javaFiles.slice(0, 2))("java file %s", async (javaFile) => {
        const [javaProjectRoot, javaPath] = javaFile.split("app/src/main/java/")
        const className = javaPath?.split("/").join(".").replace('.java', '');

        const { stdout, stderr } = await execAsync(
            `./gradlew -q -PmainClass=${className} run`,
            {
                env: {
                    "CO_API_KEY": "xx"
                },
                cwd: javaProjectRoot
            });

        console.log('stdout:', JSON.parse(stdout));
        console.log('stderr:', stderr);
    })
});
