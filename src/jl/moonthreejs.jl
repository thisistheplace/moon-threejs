# AUTO GENERATED FILE - DO NOT EDIT

export moonthreejs

"""
    moonthreejs(;kwargs...)

A MoonThreejs component.

Keyword arguments:
- `id` (String; required)
- `height` (Real; optional)
- `nforests` (Real; optional)
- `ntrees` (Real; optional)
- `radius` (Real; required)
"""
function moonthreejs(; kwargs...)
        available_props = Symbol[:id, :height, :nforests, :ntrees, :radius]
        wild_props = Symbol[]
        return Component("moonthreejs", "MoonThreejs", "moon_threejs", available_props, wild_props; kwargs...)
end

