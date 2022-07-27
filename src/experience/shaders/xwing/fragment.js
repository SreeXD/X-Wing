export default `
    uniform float progress;
    uniform float speed;
    uniform float opacity;
    uniform vec3 center;

    varying vec3 vPosition;

    void main() {
        if (distance(center, vPosition) > progress * speed) discard;

        float color = 0.08 * opacity + (1.0 - opacity);

        gl_FragColor = vec4(vec3(color), 1.0);
    }
`