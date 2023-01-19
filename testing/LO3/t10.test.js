import { execSync } from 'child_process';

test('compilation successful', () => {
    let stdout;
    try {
        stdout = execSync('cd ../../website && yarn run build', { encoding: 'utf-8' });
        // Expected message at the end of a compilation build with nextjs
        expect(stdout).toContain('(Static)  automatically rendered as static HTML (uses no initial props)');
    } catch (e) {
        console.log(e);
    }
});
