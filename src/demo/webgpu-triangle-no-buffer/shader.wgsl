struct VertexInput {
  @builtin(vertex_index) VertexIndex: u32
};

struct VertexOutput {
  @builtin(position) Position: vec4f
};

@vertex
fn vs_main(in: VertexInput) -> VertexOutput {
  var pos = array<vec2f, 3>(
    vec2f( 0.0,  0.5),
    vec2f(-0.5, -0.5),
    vec2f( 0.5, -0.5)
  );
  
  var out: VertexOutput;
  out.Position = vec4f(pos[in.VertexIndex], 0.0, 1.0);
  return out;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  return vec4f(0.918, 0.561, 0.918, 1.0);
}
