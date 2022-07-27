export default `
    uniform float color;
    uniform vec3 center;
    
    varying vec3 vPosition;

    void main() {
        gl_FragColor = vec4(vec3(color), 1.0);
    }
`