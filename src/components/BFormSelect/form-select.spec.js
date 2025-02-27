import {mount} from '@vue/test-utils'
import {createContainer, waitNT, waitRAF} from '../../../tests/utils'
import {h} from 'vue'
import BFormSelect from './BFormSelect'

describe('form-select', () => {
  afterAll(() => {
    console.warn.mockClear()
  })

  it('has select as root element', async () => {
    const wrapper = mount(BFormSelect)

    expect(wrapper.element.tagName).toBe('SELECT')

    wrapper.unmount()
  })

  it('has class form-select', async () => {
    const wrapper = mount(BFormSelect)

    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('does not have attr multiple by default', async () => {
    const wrapper = mount(BFormSelect)

    expect(wrapper.attributes('multiple')).toBeUndefined()

    wrapper.unmount()
  })

  it('does not have attr required by default', async () => {
    const wrapper = mount(BFormSelect)
    expect(wrapper.attributes('required')).toBeUndefined()

    wrapper.unmount()
  })

  it('has attr required when required=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        required: true,
      },
    })

    expect(wrapper.attributes('required')).toBeDefined()

    wrapper.unmount()
  })

  it('does not have attr form by default', async () => {
    const wrapper = mount(BFormSelect)

    expect(wrapper.attributes('form')).toBeUndefined()

    wrapper.unmount()
  })

  it('has attr form when form is set', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        form: 'foobar',
      },
    })

    expect(wrapper.attributes('form')).toBeDefined()
    expect(wrapper.attributes('form')).toBe('foobar')

    wrapper.unmount()
  })

  it('has attr multiple when multiple=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        multiple: true,
        modelValue: [],
      },
    })

    expect(wrapper.attributes('multiple')).toBeDefined()

    wrapper.unmount()
  })

  it('has attr size when select-size is set', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        selectSize: 4,
      },
    })

    expect(wrapper.attributes('size')).toBeDefined()
    expect(wrapper.attributes('size')).toBe('4')
    expect(wrapper.attributes('multiple')).toBeUndefined()

    wrapper.unmount()
  })

  it('has auto ID attr by default', async () => {
    const wrapper = mount(BFormSelect)

    await waitNT(wrapper.vm)

    expect(wrapper.attributes('id')).toBeDefined()

    wrapper.unmount()
  })

  it('has user supplied ID attr when id is set', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        id: 'foobar',
      },
    })

    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.unmount()
  })

  it('does not have attr size by default', async () => {
    const wrapper = mount(BFormSelect)

    expect(wrapper.attributes('size')).toBeUndefined()

    wrapper.unmount()
  })

  it('does have attr size when plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        plain: true,
      },
    })

    expect(wrapper.attributes('size')).toBeDefined()
    expect(wrapper.attributes('size')).toBe('0')

    wrapper.unmount()
  })

  it('has class form-select-sm when size=sm and plain=false', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        size: 'sm',
      },
    })

    expect(wrapper.classes()).toContain('form-select-sm')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class form-select-lg when size=lg and plain=false', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        size: 'lg',
      },
    })

    expect(wrapper.classes()).toContain('form-select-lg')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class form-select-foo when size=foo and plain=false', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        size: 'foo',
      },
    })

    expect(wrapper.classes()).toContain('form-select-foo')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class is-invalid and attr aria-invalid="true" when state=false', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        state: false,
      },
    })

    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('is-invalid')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class is-valid when state=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        state: true,
      },
    })

    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-valid')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has attr aria-invalid="true" when aria-invalid="true"', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        ariaInvalid: 'true',
      },
    })

    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has attr aria-invalid="true" when aria-invalid=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        ariaInvalid: true,
      },
    })

    expect(wrapper.attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('form-select')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  it('has class form-control when plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        plain: true,
      },
    })

    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.element.tagName).toBe('SELECT')

    wrapper.unmount()
  })

  it('has class form-control-lg when size=lg and plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        size: 'lg',
        plain: true,
      },
    })

    expect(wrapper.classes()).toContain('form-control-lg')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class form-control-sm when size=sm and plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        size: 'sm',
        plain: true,
      },
    })

    expect(wrapper.classes()).toContain('form-control-sm')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('has class form-control-foo when size=foo and plain=true', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        size: 'foo',
        plain: true,
      },
    })

    expect(wrapper.classes()).toContain('form-control-foo')
    expect(wrapper.classes()).toContain('form-control')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  it('focus() and blur() methods work', async () => {
    const wrapper = mount(BFormSelect, {
      attachTo: createContainer(),
    })

    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)

    expect(document.activeElement).toBe(wrapper.element)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)

    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.unmount()
  })

  it('has option elements from simple options array', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: ['one', 'two', 'three'],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    $options.forEach(($option) => {
      expect($option.attributes('disabled')).toBeUndefined()
    })

    wrapper.unmount()
  })

  it('has option elements from options array of objects', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: [
          {text: 'one', value: 1},
          {text: 'two', value: 2, disabled: true},
          {text: 'three', value: 3},
        ],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[0].attributes('value')).toBe('1')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('3')
    expect($options[0].attributes('disabled')).toBeUndefined()
    expect($options[1].attributes('disabled')).toBeDefined()
    expect($options[2].attributes('disabled')).toBeUndefined()

    wrapper.unmount()
  })

  it('has option elements from options array of objects with custom field names', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: [
          {price: 1.5, display: {text: '1,50 €'}},
          {
            price: 5,
            display: {text: '5,00 €', html: '<span class="lowest-price">5,00 €</span>'},
          },
          {price: 50.75, display: {text: '50,75 €'}, notAvailable: true},
        ],
        valueField: 'price',
        textField: 'display.text',
        htmlField: 'display.html',
        disabledField: 'notAvailable',
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('1,50 €')
    expect($options[1].text()).toBe('5,00 €')
    expect($options[2].text()).toBe('50,75 €')
    expect($options[0].find('span').exists()).toBe(false)
    expect($options[1].find('span').exists()).toBe(true)
    expect($options[2].find('span').exists()).toBe(false)
    expect($options[0].attributes('value')).toBe('1.5')
    expect($options[1].attributes('value')).toBe('5')
    expect($options[2].attributes('value')).toBe('50.75')
    expect($options[0].attributes('disabled')).toBeUndefined()
    expect($options[1].attributes('disabled')).toBeUndefined()
    expect($options[2].attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  it('has option group elements with options from options array of objects', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: [
          {
            label: 'group one',
            options: [
              {text: 'one', value: 1},
              {text: 'two', value: 2},
            ],
          },
          {
            label: 'group two',
            options: [
              {text: 'three', value: 3},
              {text: 'four', value: 4, disabled: true},
            ],
          },
        ],
      },
    })

    const $groups = wrapper.findAll('optgroup')
    expect($groups.length).toBe(2)
    expect($groups[0].attributes('label')).toBe('group one')
    expect($groups[1].attributes('label')).toBe('group two')
    expect($groups[0].findAll('option').length).toBe(2)
    expect($groups[1].findAll('option').length).toBe(2)

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(4)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[3].text()).toBe('four')
    expect($options[0].attributes('value')).toBe('1')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('3')
    expect($options[3].attributes('value')).toBe('4')
    expect($options[0].attributes('disabled')).toBeUndefined()
    expect($options[1].attributes('disabled')).toBeUndefined()
    expect($options[2].attributes('disabled')).toBeUndefined()
    expect($options[3].attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  it('has option group and option elements from options array of objects', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: [
          {text: 'one', value: 1},
          {
            label: 'group',
            options: [
              {text: 'two', value: 2},
              {text: 'three', value: 3},
            ],
          },
          {text: 'four', value: 4, disabled: true},
        ],
      },
    })

    const $groups = wrapper.findAll('optgroup')
    expect($groups.length).toBe(1)
    expect($groups[0].attributes('label')).toBe('group')
    expect($groups[0].findAll('option').length).toBe(2)

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(4)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[3].text()).toBe('four')
    expect($options[0].attributes('value')).toBe('1')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('3')
    expect($options[3].attributes('value')).toBe('4')
    expect($options[0].attributes('disabled')).toBeUndefined()
    expect($options[1].attributes('disabled')).toBeUndefined()
    expect($options[2].attributes('disabled')).toBeUndefined()
    expect($options[3].attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  it('has option elements from options legacy object format', async () => {
    const spyWarn = jest.spyOn(console, 'warn').mockImplementationOnce((fn) => fn)
    const wrapper = mount(BFormSelect, {
      props: {
        options: {one: 1, two: {value: 2, text: 'Two'}, three: 'Three'},
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('1')
    expect($options[1].text()).toBe('Two')
    expect($options[2].text()).toBe('Three')
    expect($options[0].attributes('value')).toBe('one')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('three')

    expect(spyWarn).toHaveBeenLastCalledWith(
      '[BootstrapVue warn]: BFormSelect - Setting prop "options" to an object is deprecated. Use the array format instead.'
    )

    wrapper.unmount()
  })

  it('has option elements from default slot', async () => {
    const wrapper = mount(BFormSelect, {
      slots: {
        default: [
          h('option', {value: 1}, 'one'),
          h('option', {value: 2}, 'two'),
          h('option', {value: 3}, 'three'),
        ],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')
    expect($options[2].text()).toBe('three')
    expect($options[0].attributes('value')).toBe('1')
    expect($options[1].attributes('value')).toBe('2')
    expect($options[2].attributes('value')).toBe('3')

    wrapper.unmount()
  })

  it('displays option text when value not set', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: [{text: 'one'}],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(1)
    expect($options[0].text()).toBe('one')

    wrapper.unmount()
  })

  it('updates v-model when option selected in single mode', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: ['one', 'two', 'three'],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // select 3rd option
    $options[2].setSelected()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('three')
    expect(wrapper.emitted('change')[0][0]).toBe('three')

    wrapper.unmount()
  })

  it('updating v-model (value) when selects correct option', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: ['one', 'two', {text: 'three', value: {three: 3}}],
        modelValue: 'one',
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)
    expect($options[0].element.selected).toBe(true)

    // Select 2nd option
    await wrapper.setProps({modelValue: 'two'})
    expect($options[1].element.selected).toBe(true)

    // Select 3rd option
    await wrapper.setProps({modelValue: {three: 3}})
    expect($options[2].element.selected).toBe(true)

    wrapper.unmount()
  })

  it('updates v-model when option selected in single mode with complex values', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        options: [
          {text: 'one', value: {a: 1}},
          {text: 'two', value: {b: 2}},
          {text: 'three', value: {c: 3}},
        ],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // Select 3rd option
    $options[2].setSelected()
    await waitNT(wrapper.vm)

    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual({c: 3})
    expect(wrapper.emitted('change')[0][0]).toEqual({c: 3})

    wrapper.unmount()
  })

  it('updates v-model when option selected in multiple mode', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        multiple: true,
        selectSize: 3,
        options: ['one', 'two', 'three'],
        modelValue: [],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // Select 2nd and 3rd option
    $options[1].element.selected = true
    $options[2].element.selected = true
    await wrapper.trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['two', 'three'])
    expect(wrapper.emitted('change')[0][0]).toEqual(['two', 'three'])

    wrapper.unmount()
  })

  it('updates v-model when option selected in multiple mode with complex values', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        multiple: true,
        selectSize: 3,
        modelValue: [],
        options: [
          {text: 'one', value: {a: 1}},
          {text: 'two', value: {b: 2}},
          {text: 'three', value: {c: 3}},
        ],
      },
    })

    const $options = wrapper.findAll('option')
    expect($options.length).toBe(3)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()

    // Select 2nd and 3rd option
    $options[1].element.selected = true
    $options[2].element.selected = true
    await wrapper.trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([{b: 2}, {c: 3}])
    expect(wrapper.emitted('change')[0][0]).toEqual([{b: 2}, {c: 3}])

    wrapper.unmount()
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('prop `autofocus`', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: 24,
        height: 24,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }))
    })

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('works when true', async () => {
      const wrapper = mount(BFormSelect, {
        attachTo: createContainer(),
        props: {
          autofocus: true,
          options: ['a', 'b', 'c'],
        },
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const input = wrapper.find('select')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).toBe(input.element)

      wrapper.unmount()
    })

    it('does not autofocus when false', async () => {
      const wrapper = mount(BFormSelect, {
        attachTo: createContainer(),
        props: {
          autofocus: false,
          options: ['a', 'b', 'c'],
        },
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const input = wrapper.find('select')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).not.toBe(input.element)

      wrapper.unmount()
    })
  })
})
