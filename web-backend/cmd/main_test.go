package main

import (
  "testing"
  "github.com/stretchr/testify/assert"
)

func MainTest (t *testing.T) {
  main()
  assert.Equal(t, 1, 1, "should be equal")
}
