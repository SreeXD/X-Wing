export default `
    varying vec3 vPosition;

    void main() {
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;

        vPosition = gl_Position.xyz;
    }
`