export default `
    uniform float time;

    varying vec3 vPosition;

    void main() {
        float dis = distance(vPosition, vec3(0)) - time * time * 20.0;
        
        if (dis > 0.0) 
            discard;

        float opacity = (0.5 - distance(gl_PointCoord, vec2(0.5, 0.5)));
        opacity = max(opacity, 0.0) * 1.3;
        opacity = min(opacity, -dis * 0.01);

        gl_FragColor = vec4(vec3(0.05), opacity);
    }
`