# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class MoonThreejs(Component):
    """A MoonThreejs component.


Keyword arguments:

- id (string; required)

- radius (number; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'moon_threejs'
    _type = 'MoonThreejs'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, radius=Component.REQUIRED, **kwargs):
        self._prop_names = ['id', 'radius']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'radius']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['id', 'radius']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(MoonThreejs, self).__init__(**args)
